import * as React from 'react'
import PopupPocketList from './popup-pocket-list'
import PopupPocketDetail from './popup-pocket-detail'
import { State, RouterState } from '../../types'
import { connect } from 'react-redux'

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
