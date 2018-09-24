import { ActionType, getType } from 'typesafe-actions'
import { TabState } from '../constants'
import * as tab from '../actions/tab'

export type TabAction = ActionType<typeof tab>

const tabReducer = (state: TabState = {byId: {}, idList: []}, action: TabAction): TabState => {
  switch (action.type) {
    case getType(tab.add):
      return state

    default:
      return state
  }
}

export default tabReducer
