import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import infoIcon from './icon.svg?component'
import errorIcon from './error.svg?component'
import successIcon from './success.svg?component'
import warnIcon from './warn.svg?component'
// 消息
const Message = (message: string): any => {
    return ElMessage({
        message,
        customClass: 'normal',
        icon: infoIcon,
    })
}

// 成功
const successMessage = (message: string): any => {
    return ElMessage({
        message,
        customClass: 'success',
        icon: successIcon,
    })
}

// 警告
const warnMessage = (message: string): any => {
    return ElMessage({
        message,
        customClass: 'warn',
        icon: warnIcon,
    })
}

// 失败
const errorMessage = (message: string): any => {
    return ElMessage({
        message,
        customClass: 'error',
        icon: errorIcon,
    })
}

interface msgBoxItf {
    message: string
    title?: string
}
const confirmMessageBox = ({ message, title = '提示' }: msgBoxItf): Promise<any> => {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(message, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            showClose: false,
            confirmButtonClass: 'confirm-button-class',
            // beforeClose: () => {

            // }
        })
            .then(() => {
                resolve('')
            })
            .catch(() => {
                reject()
            })
    })
}
export { Message, successMessage, warnMessage, errorMessage, confirmMessageBox }
