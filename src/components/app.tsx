import * as React from 'react'
import PopupPocketList from '../popup/components/popup-pocket-list'
import { State, RouterState } from '../types'
import { connect } from 'react-redux'

const mapStateToProps = ({router}: State) => router

const getComponent = (router: RouterState) => {
  switch (router.route) {
    case 'POCKET_LIST':
    default:
      return <PopupPocketList/>
  }
}

const App = (router: RouterState) => (
  getComponent(router)
)

export default connect(mapStateToProps)(App)
