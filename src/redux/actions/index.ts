import { ActionType } from 'typesafe-actions'

import * as pocket from './pocket'
import * as route from './route'
import * as tab from './tab'

export * from './pocket'
export * from './route'
export * from './tab'

export type TabAction = ActionType<typeof tab>
export type PocketAction = ActionType<typeof pocket>
export type RouteAction = ActionType<typeof route>
