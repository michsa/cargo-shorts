import { NewPocketRoute, EditPocketRoute } from '../types'
import { ROUTE, ROUTE_EDIT_POCKET } from '../constants'
import { action } from 'typesafe-actions'

export const routeNewPocket =
  () => action(ROUTE, {} as NewPocketRoute)

export const routeEditPocket =
  (id: string) => action(ROUTE, {} as EditPocketRoute)

export const routePocketList =
  () => action(ROUTE_EDIT_POCKET)

export const route =
  (rt: string) => action(ROUTE, rt)
