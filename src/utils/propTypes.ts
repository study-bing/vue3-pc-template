import { CSSProperties, VNodeChild } from 'vue'
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types'

export type VueNode = VNodeChild | JSX.Element

type PropTypes = VueTypesInterface & {
    readonly style: VueTypeValidableDef<CSSProperties>
    readonly VNodeChild: VueTypeValidableDef<VueNode>
}

const propTypes = createTypes({
    func: undefined,
    bool: undefined,
    string: undefined,
    number: undefined,
    object: undefined,
    integer: undefined,
    array: () => [],
}) as PropTypes

export { propTypes }
