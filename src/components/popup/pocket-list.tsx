import { move } from 'ramda'
import * as React from 'react'
import {
  DragDropContext, Droppable, DroppableProvided,
  DroppableStateSnapshot, DropResult
} from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { movePocket, moveTab, newTab, removeTab } from '../../redux/actions/ui'
import { getCurrentSavedTab, getCurrentTab, getOrderedPockets } from '../../redux/selectors'
import { EditPocketRoute, NewPocketRoute, Pocket, PocketID, SavedTab, State, Tab } from '../../types'
import NewPocketButton from '../shared/new-pocket-button'
import TabInfo from '../shared/tab-info'
// import { List } from '../shared/utils'

import { route } from './hooks'
import PocketListItem from './pocket-list-item'
import PopupHeader from './popup-header'

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
  ) => void,
  onNewPocket: () => void,
  onDragEnd: (result: DropResult) => void
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state),
  savedTab: getCurrentSavedTab(state),
  tab: getCurrentTab(state)
} as StateProps)

const mapDispatchToProps = {
  onPocketClick: (pocketId, tab, savedTab) => (
    savedTab
      ? savedTab.pocket === pocketId
        ? removeTab(savedTab)
        : moveTab({ tabId: savedTab.id, pocketId })
      : newTab({ tab, pocketId })
  ),
  onDragEnd: (result: DropResult) => (
    result.destination && movePocket({
      start: result.source.index,
      end: result.destination.index
    })
  ),
  onNewPocket: () => null // shufflePockets()
} as Handlers

const PocketList = ({
  setRoute, pockets, savedTab, tab, onPocketClick, onNewPocket, onDragEnd
}: OwnProps & StateProps & Handlers) => {

  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      pockets = move(result.source.index, result.destination.index, pockets)
      onDragEnd(result)
    }
  }

  return (
    <section id='pocket-list'>
      <PopupHeader>
        <TabInfo tab={tab} />
      </PopupHeader>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId={'popupPocketList'}
        >
          {(
            provided: DroppableProvided,
            snapshot: DroppableStateSnapshot,
          ) => (
              <div
                className="list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {pockets.map((pocket, index) =>
                  <PocketListItem
                    key={pocket.id}
                    pocket={pocket}
                    isActive={!!savedTab && savedTab.pocket === pocket.id}
                    handleClick={(id: PocketID) => onPocketClick(id, tab, savedTab)}
                    handleEdit={() => setRoute(route.editPocket(pocket.id))}
                    index={index}
                  />
                )}
                {provided.placeholder}
                <div>
                  <NewPocketButton
                    onClick={() => {
                      onNewPocket()
                      setRoute(route.newPocket())
                    }}
                  />
                </div>
              </div>
            )}
        </Droppable>
      </DragDropContext>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketList)
