/*
 * @Author: linbin
 * @Date: 2021-10-27 18:26:33
 * @LastEditTime: 2022-07-07 13:00:49
 * @LastEditors: linBin
 * @Description: 正则判断
 * @FilePath: /zzx-internet-web/src/components/global/obInput/setValue.ts
 */

type rule = {
    [props: string]: RegExp
}
const ruleConfig: rule = {
    int: /^(-)?(?:(?:[1-9]\d{0,}|0(?!\d))(?:)?)?/, // 整数
    cen: /[A-Za-z0-9\u4e00-\u9fa5\s]+/, // 中文、整数、英文
    noText: /[a-zA-Z0-9_]+/, // 字母,整数,下划线
    number: /^(-)?(?:(?:[1-9]\d{0,}|0(?!\d))(?:\.\d{0,})?)?/, // 数字
    noWord: /[a-zA-Z0-9-`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|、]+/, // 不能输入汉字
    en: /[a-zA-Z0-9]+/, //字符整数
    ce: /[A-Za-z\u4e00-\u9fa5\s]+/, // 字符中文
    onlyE: /[a-zA-Z_-]+/, //英文下划线,
}

export function setValue(data, type: string): string {
    const reg = ruleConfig[type]
    if (data !== '') {
        data = reg.exec(data)
        if (data !== null) {
            data = data[0]
        } else {
            data = ''
        }
    }
    return data
}
export const isEmpty = function (data): boolean {
    if (typeof data === 'undefined' || data === '' || data === null) {
        return true
    } else {
        return false
    }
}
