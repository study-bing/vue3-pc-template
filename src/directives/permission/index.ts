import { usePermissionStoreHook } from '@/store/modules/permission'
import { Directive } from 'vue'
import type { DirectiveBinding } from 'vue'

export const allow: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding
        if (value) {
            const authRoles = value
            const hasAuth = usePermissionStoreHook().buttonAuth.includes(authRoles)
            if (!hasAuth) {
                el.parentNode.removeChild(el)
            }
        }
    },
}
