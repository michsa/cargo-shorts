export enum Route {
  POCKET_LIST,
  NEW_POCKET,
  EDIT_POCKET
}

export type State = {
  readonly route: Route,
  readonly pockets: PocketState,
  readonly tabs: TabState
}

// --- pockets --- //

export type PocketState = {
  readonly byId: PocketMap,
  readonly idList: string[]
}

export type PocketMap =  Readonly<{[id: string]: Pocket}>

export interface Pocket {
  name: string,
  color: string,
  icon: string,
  tabs: string[]
}

// --- tabs --- //

export type TabState = {
  readonly byId: TabMap,
  readonly current?: Tab
}

export type TabMap = Readonly<{[id: string]: Tab}>

export type Tab = {
  url?: string,
  title?: string
}
