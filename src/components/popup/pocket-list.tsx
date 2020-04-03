/** @jsx jsx */
import { jsx } from '@emotion/core'
import { move } from 'ramda'
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult
} from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { movePocket, moveTab, newTab, removeTab } from '../../redux/actions/ui'
import {
  getCurrentSavedTab,
  getCurrentTab,
  getOrderedPockets
} from '../../redux/selectors'
import {
  EditPocketRoute,
  NewPocketRoute,
  Pocket,
  PocketID,
  SavedTab,
  State,
  Tab
} from '../../types'
import Flex from '../shared/flex'
import NewPocketButton from '../shared/new-pocket-button'
import TabInfo from '../shared/tab-info'

import { route } from './hooks'
import PocketListItem from './pocket-list-item'
import PopupHeader from './popup-header'

interface OwnProps {
  setRoute: (route: NewPocketRoute | EditPocketRoute) => void
}

interface StateProps {
  pockets: Pocket[]
  savedTab: SavedTab | undefined
  tab: Tab
}

interface Handlers {
  onPocketClick: (
    pocketId: PocketID,
    tab: Tab,
    savedTab: SavedTab | undefined
  ) => void
  onNewPocket: () => void
  onDragEnd: (result: DropResult) => void
}

const mapStateToProps = (state: State) =>
  ({
    pockets: getOrderedPockets(state),
    savedTab: getCurrentSavedTab(state),
    tab: getCurrentTab(state)
  } as StateProps)

const mapDispatchToProps = {
  onPocketClick: (pocketId, tab, savedTab) =>
    savedTab
      ? savedTab.pocket === pocketId
        ? removeTab(savedTab)
        : moveTab({ tabId: savedTab.id, pocketId })
      : newTab({ tab, pocketId }),
  onDragEnd: (result: DropResult) =>
    result.destination &&
    movePocket({
      start: result.source.index,
      end: result.destination.index
    }),
  onNewPocket: () => null // shufflePockets()
} as Handlers

const PocketList = ({
  setRoute,
  pockets,
  savedTab,
  tab,
  onPocketClick,
  onNewPocket,
  onDragEnd
}: OwnProps & StateProps & Handlers) => {
  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      pockets = move(result.source.index, result.destination.index, pockets)
      onDragEnd(result)
    }
  }

  return (
    <section id="pocket-list">
      <PopupHeader>
        <TabInfo tab={tab} />
      </PopupHeader>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={'popupPocketList'}>
          {(provided: DroppableProvided) => (
            <Flex
              column
              gap={8}
              css={{
                maxHeight: 384,
                padding: 8,
                overflowY: 'visible'
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {pockets.map((pocket, index) => (
                <PocketListItem
                  key={pocket.id}
                  pocket={pocket}
                  isActive={!!savedTab && savedTab.pocket === pocket.id}
                  handleClick={(id: PocketID) =>
                    onPocketClick(id, tab, savedTab)
                  }
                  handleEdit={() => setRoute(route.editPocket(pocket.id))}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <NewPocketButton
                onClick={() => {
                  onNewPocket()
                  setRoute(route.newPocket())
                }}
              />
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketList)
