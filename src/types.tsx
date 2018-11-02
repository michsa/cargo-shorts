export class NewPocketRoute {
  route: 'NEW_POCKET'
}

export class EditPocketRoute {
  route: 'EDIT_POCKET'
  data: {
    id: string
  }
}

export class PocketListRoute {
  route: 'POCKET_LIST'
}

export type RouterState = (NewPocketRoute | EditPocketRoute | PocketListRoute)

export type State = {
  readonly router: RouterState,
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
  id: string,
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
  url: string,
  title: string
}
