import * as React from 'react'
import { connect } from 'react-redux'

import { moveTab, newTab, removeTab } from '../../redux/actions/ui'
import { getCurrentSavedTab, getCurrentTab, getOrderedPockets } from '../../redux/selectors'
import { EditPocketRoute, NewPocketRoute, Pocket, PocketID, SavedTab, State, Tab } from '../../types'
import NewPocketButton from '../shared/new-pocket-button'
import TabInfo from '../shared/tab-info'
import { List, PopupHeader } from '../shared/utils'

import { route } from './hooks'
import PocketInfo from './pocket-list-item'

interface OwnProps {
  setRoute: (route: NewPocketRoute | EditPocketRoute) => void
}

interface StateProps {
  pockets: Pocket[],
  savedTab: SavedTab | undefined,
  tab: Tab
}

interface Handlers {
  onPocketClick: (
    pocketId: PocketID,
    tab: Tab,
    savedTab: SavedTab | undefined
  ) => void
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state),
  savedTab: getCurrentSavedTab(state),
  tab: getCurrentTab(state)
} as StateProps)

const mapDispatchToProps = {
  onPocketClick: (pocketId, tab, savedTab) =>
    savedTab
      ? savedTab.pocket === pocketId
        ? removeTab(savedTab)
        : moveTab({ tab: savedTab, pocketId })
      : newTab({ tab, pocketId })
} as Handlers

const PocketList = ({
  setRoute, pockets, savedTab, tab, onPocketClick
}: OwnProps & StateProps & Handlers) => (
    <section className='pocketList'>
      <PopupHeader>
        <TabInfo tab={tab} />
      </PopupHeader>
      <List>
        {pockets.map((pocket) =>
          <PocketInfo
            pocket={pocket}
            isActive={!!savedTab && savedTab.pocket === pocket.id}
            key={pocket.id}
            handleClick={(id: PocketID) => onPocketClick(id, tab, savedTab)}
            handleEdit={() => setRoute(route.editPocket(pocket.id))}
          />
        )}
        <li onClick={() => setRoute(route.newPocket())}><NewPocketButton /></li>
      </List>
    </section>
  )

export default connect(mapStateToProps, mapDispatchToProps)(PocketList)
