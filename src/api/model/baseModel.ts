export interface BasicPageParams {
    curPage: number
    pageSize: number
}

export interface BasicFetchResult<T> {
    infoLists: T[]
    totalNumber: number
}
