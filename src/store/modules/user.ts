import { defineStore } from 'pinia'
import { userType } from './types'

const data = '{}'
let token = ''
let name = ''
if (data) {
    const dataJson = JSON.parse(data)
    if (dataJson) {
        token = dataJson?.accessToken
        name = dataJson?.name ?? 'admin'
    }
}

export const useUserStore = defineStore({
    id: 'pure-user',
    state: (): userType => ({
        token,
        name,
    }),
    actions: {
        SET_TOKEN(token: string) {
            this.token = token
        },
        SET_NAME(name: string) {
            this.name = name
        },
        // // 登入
        // async loginByUsername(data) {
        //     return new Promise<void>((resolve, reject) => {
        //         getLogin(data)
        //             .then(data => {
        //                 if (data) {
        //                     resolve();
        //                 }
        //             })
        //             .catch(error => {
        //                 reject(error);
        //             });
        //     });
        // },
        // // 登出 清空缓存
        // logOut() {
        //     this.token = "";
        //     this.name = "";
        //     removeToken();
        //     storageSession.clear();
        //     router.push("/login");
        // },
        // // 刷新token
        // async refreshToken(data) {
        //     return refreshToken(data).then(data => {
        //         if (data) {
        //             setToken(data);
        //             return data;
        //         }
        //     });
        // }
    },
})

export function useUserStoreHook() {
    return useUserStore()
}
