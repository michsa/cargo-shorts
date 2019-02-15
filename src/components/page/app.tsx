import * as React from 'react'
import { connect } from 'react-redux'

import { RouterState, State } from '../../types'
import PopupPocketList from '../popup/popup-pocket-list'

const mapStateToProps = ({router}: State) => router

const getComponent = (router: RouterState) => {
  switch (router.route) {
    case 'NEW_POCKET':
      return <PopupPocketList/>
    case 'EDIT_POCKET':
      return <PopupPocketList/>
    case 'POCKET_LIST':
    default:
      return <PopupPocketList/>
  }
}

const App = (router: RouterState) => (
  getComponent(router)
)

export default connect(mapStateToProps)(App)
