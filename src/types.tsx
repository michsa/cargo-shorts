export type PocketMap =  Readonly<{[id: string]: Pocket}>

export type PocketState = {
  readonly byId: PocketMap,
  readonly idList: string[]
}

export type TabMap = Readonly<{[id: string]: Tab}>

export type TabState = {
  readonly byId: TabMap,
  readonly current?: Tab
}

export type State = {
  readonly pockets: PocketState,
  readonly tabs: TabState
}

export interface Pocket {
  name: string,
  color: string,
  icon: string,
  tabs: string[]
}

export type Tab = {
  url?: string,
  title?: string
}