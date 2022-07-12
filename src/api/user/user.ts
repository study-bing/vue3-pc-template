import { http } from '@/utils/http'
import { LoginResult, LoginParams } from './model/userModel'
enum Api {
    Login = '/login',
    UserList = '/paas/parsing/rule/list',
}

export const getLogin = (data: LoginParams) => {
    return http.request<LoginResult>('post', Api.Login, { data })
}

export const userList = (params: object) => {
    return http.request('get', Api.UserList, { params })
}
