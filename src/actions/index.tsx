import { Route } from '../types'
import { ROUTE } from '../constants'

export * from './tab'
export * from './pocket'

export const route = (data: Route) => ({
  type: ROUTE,
  payload: data
})
