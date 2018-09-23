export type State = {
    readonly pockets: Readonly<{[id: string]: Pocket}>,
    readonly items: Readonly<{[id: string]: Item}>,
    readonly pocketList: Pocket[],
}

export interface Pocket {
    name: string,
    color: string,
    icon: string
}

export interface Item {
    url: string,
    title: string,
    pocket: string
}

export const ADD_POCKET = 'pocket/ADD'
export const DELETE_POCKET = 'pocket/DELETE'
export const MODIFY_POCKET = 'pocket/MODIFY'
export const REORDER_POCKET = 'pocket/REORDER'
export const ADD_PAGE = 'page/ADD' // always assigns after adding - make same action?
export const ASSIGN_PAGE = 'page/ASSIGN'
export const REORDER_PAGE = 'page/REORDER'
