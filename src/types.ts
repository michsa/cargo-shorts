import { BaseEmoji } from 'emoji-mart'

// --- utils --- //

export type Diff<T, U> = T extends U ? never : T

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

export type Args<T> = T extends (...xs: infer A) => unknown ? A : never

// --- state --- //

export type State = {
  readonly pockets: PocketState
  readonly tabs: TabState
}

// --- routes --- //

export class NewPocketRoute {
  id: 'NEW_POCKET'
}

export class EditPocketRoute {
  id: 'EDIT_POCKET'
  data: PocketID
}

export class PocketListRoute {
  id: 'POCKET_LIST'
}

export type RouterState = NewPocketRoute | EditPocketRoute | PocketListRoute

// --- pockets --- //

export type PocketID = string

export type PocketMap = Readonly<{ [id in PocketID]: Pocket }>

export interface Pocket {
  id: PocketID
  name: string
  color: string
  icon: string | BaseEmoji
  tabs: TabID[]
}

export type PocketSettings = Omit<Pocket, 'id' | 'tabs'>

export type PocketState = {
  readonly byId: PocketMap
  readonly idList: PocketID[]
}

// --- tabs --- //

export type TabID = string

export type Tab = {
  url: string
  title: string
  favicon: string
}

export type SavedTab = Tab & {
  id: TabID
  pocket: PocketID
}

export type TabMap = Readonly<{ [id in TabID]: SavedTab }>

export type TabState = {
  readonly byId: TabMap
  readonly current?: Tab
}
