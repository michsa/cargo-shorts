/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { makeGetOrderedTabs } from '../../redux/selectors'
import styled from '../../styled'
import { PocketID, SavedTab, State } from '../../types'
import { Emoji } from '../shared/emoji'
import Flex from '../shared/flex'
import { List } from '../shared/utils'

import TabListItem from './tab-list-item'

interface OwnProps {
  pocketId: PocketID
  color: string
}

interface StateProps {
  tabs: SavedTab[]
}

const StyledList = styled(List)<{ color: string }>(({ color }) => ({
  border: '0px dashed',
  borderColor: color,
  borderTop: 0,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4
}))

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
        css={{
          overflow: 'auto',
          paddingBottom: 4,
          flexGrow: 1,
          /* for Firefox */
          minHeight: 0
        }}
        color={color}
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {tabs && tabs.length ? (
          <Fragment>
            {tabs.map((tab, index) => (
              <TabListItem tab={tab} key={tab.id} index={index} />
            ))}
            {provided.placeholder}
          </Fragment>
        ) : (
          <Flex
            center
            gap={8}
            css={{ height: 48, fontSize: '1.5em', fontWeight: 100 }}
          >
            <span>{`This pocket's empty...`}</span>
            <span>
              <Emoji emoji="🕳️" />
            </span>
          </Flex>
        )}
      </StyledList>
    )}
  </Droppable>
)

// 🤷

export default connect(makeMapStateToProps)(TabList)
