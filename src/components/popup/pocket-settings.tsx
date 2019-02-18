import * as React from 'react'
import { TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { newPocket } from '../../redux/actions/ui'
import { Pocket, PocketListRoute, State } from '../../types'

import { route } from './router'

interface OwnProps {
  id?: string,
  isNew: boolean,
  setRoute: (route: PocketListRoute) => void
}

interface StateProps {
  pocket?: Pocket
}

interface Handlers {
  onConfirm: (pocket: Pocket, isNew: boolean) => void
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  pocket: ownProps.id
    ? state.pockets[ownProps.id]
    : undefined
} as StateProps)

const mapDispatchToProps = {
  onConfirm: (pocket: Pocket, isNew: boolean) =>
    newPocket(pocket)
} as Handlers

const PocketSettings = ({ isNew, setRoute, pocket, onConfirm }: OwnProps & StateProps & Handlers) => (
  <form id="pocket-detail">
    <header>{isNew ? 'New Pocket' : 'Edit Pocket'}</header>
    <div>
      <label>Name:</label>
      <input type="text" value={pocket ? pocket.name : ''} />
    </div>
    <div>
      <label>Color:</label>
      <TwitterPicker />
    </div>
    <div>
      <label>Icon:</label>
      <div>(placeholder emoji picker)</div>
    </div>
    <nav>
      <div
        className="cancel"
        onClick={() => {
          setRoute(route.pocketList())
        }}
      >
        &lt;--
      </div>
      <div className="confirm" onClick={() => setRoute(route.pocketList())}>--&gt;</div>
    </nav>
  </form>
)

export default connect(mapStateToProps, mapDispatchToProps)(PocketSettings)
