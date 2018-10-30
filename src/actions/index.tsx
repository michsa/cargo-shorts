import { NewPocketRoute, EditPocketRoute } from '../types'
import { ROUTE, ROUTE_EDIT_POCKET } from '../constants'

export * from './tab'
export * from './pocket'

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
