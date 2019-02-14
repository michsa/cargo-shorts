import { NewPocketRoute, EditPocketRoute, PocketListRoute } from '../../types'
import { action } from 'typesafe-actions'

export const routeNewPocket =
  () => action('ROUTE', {} as NewPocketRoute)

export const routeEditPocket =
  (id: string) => action('ROUTE', {} as EditPocketRoute)

export const routePocketList =
  () => action('ROUTE', {} as PocketListRoute)

/*
export const route =
  (rt: string) => action('ROUTE', rt)
*/
