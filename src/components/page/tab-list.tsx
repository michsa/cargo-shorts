import * as React from 'react'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { makeGetOrderedTabs } from '../../redux/selectors'
import styled from '../../styled-components'
import { PocketID, SavedTab, State } from '../../types'
import { List } from '../shared/utils'

import TabListItem from './tab-list-item'

interface OwnProps {
  pocketId: PocketID
  color: string
}

interface StateProps {
  tabs: SavedTab[]
}

const StyledList = styled(List)<{ color: string }>`
  border: 0px dashed ${props => props.color};
  border-top: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`

const makeMapStateToProps = () => {
  const getOrderedTabs = makeGetOrderedTabs()
  const mapStateToProps = (state: State, { pocketId }: OwnProps) =>
    ({
      tabs: getOrderedTabs(state, pocketId)
    } as StateProps)
  return mapStateToProps
}

const TabList = ({ pocketId, tabs, color }: StateProps & OwnProps) => (
  <Droppable droppableId={pocketId} direction="vertical" type="LIST">
    {(provided: DroppableProvided) => (
      <StyledList
        className="tab-list"
        color={color}
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {tabs.map((tab, index) => (
          <TabListItem tab={tab} key={tab.id} index={index} />
        ))}
        {provided.placeholder}
      </StyledList>
    )}
  </Droppable>
)

export default connect(makeMapStateToProps)(TabList)
