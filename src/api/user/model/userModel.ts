import { BasicFetchResult } from '@/api/model/baseModel'

export interface LoginResult {
    username: string
    userId: string | number
    token: string
}

export interface LoginParams {
    username: string
}

export interface ListOptionsItem {
    label: string
    value: string
}

export type ListOptionsGetResultModel = BasicFetchResult<ListOptionsItem>
