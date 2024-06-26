import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { PureHttpError, RequestMethods, PureHttpResponse, PureHttpRequestConfig } from './types.d'
import qs from 'qs'
import { loadEnv } from '@build/index'
// import { useUserStoreHook } from '@/store/modules/user'
import { errorMessage } from '@/utils/message'
import { storageLocal } from '@/utils/storage'
import router from '@/router'
// 加载环境变量 VITE_PROXY_DOMAIN（开发环境）  VITE_PROXY_DOMAIN_REAL（打包后的线上环境）
const { VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = loadEnv()

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? VITE_PROXY_DOMAIN_REAL : VITE_PROXY_DOMAIN,
    timeout: 10000,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    // 数组格式参数序列化
    paramsSerializer: params => qs.stringify(params, { indices: false }),
}

class PureHttp {
    constructor() {
        this.httpInterceptorsRequest()
        this.httpInterceptorsResponse()
    }
    // 初始化配置对象
    private static initConfig: PureHttpRequestConfig = {}

    // 保存当前Axios实例对象
    private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

    // 请求拦截
    private httpInterceptorsRequest(): void {
        PureHttp.axiosInstance.interceptors.request.use(
            (config: PureHttpRequestConfig) => {
                const $config = config
                // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
                if (typeof config.beforeRequestCallback === 'function') {
                    config.beforeRequestCallback($config)
                    return $config
                }
                if (PureHttp.initConfig.beforeRequestCallback) {
                    PureHttp.initConfig.beforeRequestCallback($config)
                    return $config
                }
                const token = storageLocal.getItem('token')
                if (token) {
                    config.headers['Authorization'] = `${token}`
                    return $config
                } else {
                    return $config
                }
            },
            error => {
                return Promise.reject(error)
            }
        )
    }

    // 响应拦截
    private httpInterceptorsResponse(): void {
        const instance = PureHttp.axiosInstance
        instance.interceptors.response.use(
            (response: PureHttpResponse) => {
                const $config = response.config
                // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
                if (typeof $config.beforeResponseCallback === 'function') {
                    $config.beforeResponseCallback(response)
                    return response.data
                }
                if (PureHttp.initConfig.beforeResponseCallback) {
                    PureHttp.initConfig.beforeResponseCallback(response)
                    return response.data
                }
                if (response.headers['content-type'].includes('application/vnd.ms-excel')) {
                    return Promise.resolve(response)
                } else if (response.headers['content-type'] === 'image/jpeg') {
                    const url = window.URL.createObjectURL(response.data)
                    return Promise.resolve(url)
                } else {
                    const responseCode = response.status
                    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
                    // 否则的话抛出错误
                    if (
                        responseCode === 200 &&
                        (response.data?.code === 200 || !response.data?.code)
                    ) {
                        return Promise.resolve(response.data?.data)
                    } else {
                        errorShow(response.data.msg || response.data.message)
                        return Promise.reject(response.data)
                    }
                }
            },
            (error: PureHttpError) => {
                const $error = error
                $error.isCancelRequest = Axios.isCancel($error)
                if (
                    $error?.response?.data &&
                    ($error?.response?.data['msg'] || $error?.response?.data['message'])
                ) {
                    errorShow($error.response.data['msg'] || $error.response.data['message'])
                }
                // 所有的响应异常 区分来源为取消请求/非取消请求
                return Promise.reject($error)
            }
        )
    }

    // 通用请求工具函数
    public request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: PureHttpRequestConfig
    ): Promise<T> {
        const config = {
            method,
            url,
            ...param,
            ...axiosConfig,
        } as PureHttpRequestConfig

        // 单独处理自定义请求/响应回掉
        return new Promise((resolve, reject) => {
            PureHttp.axiosInstance
                .request(config)
                .then((response: undefined) => {
                    resolve(response)
                })
                .catch(error => {
                    if (error?.response?.status === 401) {
                        storageLocal.removeItem('token')
                        router.push('/login')
                        return
                    }
                    reject(error)
                })
        })
    }

    // 单独抽离的post工具函数
    public post<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P> {
        return this.request<P>('post', url, params, config)
    }

    // 单独抽离的get工具函数
    public get<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P> {
        return this.request<P>('get', url, params, config)
    }
}
function errorShow(msg) {
    if (msg !== sessionStorage.getItem('errorTxt') && msg) {
        errorMessage(msg)
        sessionStorage.setItem('errorTxt', msg)
        setTimeout(() => {
            sessionStorage.removeItem('errorTxt')
        }, 2000)
    }
}
export const http = new PureHttp()
