export type PocketState = {
    readonly byId: Readonly<{[id: string]: Pocket}>,
    readonly idList: string[]
}

export type TabState = {
    readonly byId: Readonly<{[id: string]: Tab}>,
    readonly idList: string[]
}

export type State = {
    readonly pocket: PocketState,
    readonly tab: TabState
}

export interface Pocket {
    name: string,
    color: string,
    icon: string
}

export interface Tab {
    url: string,
    title: string,
    pocket: string
}

export const ADD_POCKET = 'pocket/ADD'
export const DELETE_POCKET = 'pocket/DELETE'
export const MODIFY_POCKET = 'pocket/MODIFY'
export const REORDER_POCKET = 'pocket/REORDER'
export const ADD_TAB = 'tab/ADD' // always assigns after adding - make same action?
export const ASSIGN_TAB = 'tab/ASSIGN'
export const DELETE_TAB = 'tab/DELETE'
export const REORDER_TAB = 'tab/REORDER'
