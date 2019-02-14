import { ActionType } from 'typesafe-actions'
import * as tab from './tabs/actions'
import * as pocket from './pockets/actions'
import * as route from './router/actions'

export * from './pockets/actions'
export * from './tabs/actions'
export * from './router/actions'

export type TabAction = ActionType<typeof tab>
export type PocketAction = ActionType<typeof pocket>
export type RouteAction = ActionType<typeof route>
