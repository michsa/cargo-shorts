export type State = {
  readonly router: RouterState,
  readonly pockets: PocketState,
  readonly tabs: TabState
}

// --- routes --- //

export class NewPocketRoute {
  route: 'NEW_POCKET'
}

export class EditPocketRoute {
  route: 'EDIT_POCKET'
  id: PocketID
}

export class PocketListRoute {
  route: 'POCKET_LIST'
}

export type RouterState = (NewPocketRoute | EditPocketRoute | PocketListRoute)

// --- pockets --- //

export type PocketID = string

export type PocketMap = Readonly<{[id in PocketID]: Pocket}>

export interface Pocket {
  id: PocketID,
  name: string,
  color: string,
  icon: string,
  tabs: TabID[]
}

export type PocketState = {
  readonly byId: PocketMap,
  readonly idList: PocketID[]
}

// --- tabs --- //

export type TabID = string

export type Tab = {
  url: string,
  title: string
}

export type SavedTab = Tab & {
  id: TabID,
  pocket: PocketID
}

export type TabMap = Readonly<{[id in TabID]: SavedTab}>

export type TabState = {
  readonly byId: TabMap,
  readonly current?: Tab
}
