import * as React from 'react'
import { connect } from 'react-redux'

import { RouterState, State } from '../../types'

import PopupPocketDetail from './popup-pocket-detail'
import PopupPocketList from './popup-pocket-list'

const mapStateToProps = ({router}: State) => router

const getComponent = (router: RouterState) => {
  switch (router.route) {
    case 'NEW_POCKET':
      return <PopupPocketDetail isNew={true} />
    case 'EDIT_POCKET':
      return <PopupPocketDetail id={router.data.id} isNew={false} />
    case 'POCKET_LIST':
    default:
      return <PopupPocketList/>
  }
}

const App = (router: RouterState) => (
  getComponent(router)
)

export default connect(mapStateToProps)(App)
