import { NewPocketRoute, EditPocketRoute } from '../types'
import { ROUTE, ROUTE_EDIT_POCKET } from '../constants'

export const routeNewPocket = () => ({
  type: ROUTE,
  payload: {} as NewPocketRoute
})

export const routeEditPocket = (id: string) => ({
  type: ROUTE,
  payload: {} as EditPocketRoute
})

export const routePocketList = () => ({
  type: ROUTE_EDIT_POCKET
})

export const route = (rt: string) => ({
  type: ROUTE,
  payload: rt
})
