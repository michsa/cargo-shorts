/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { makeGetOrderedTabs } from '../../redux/selectors'
import { PocketID, SavedTab, State } from '../../types'
import { Emoji } from '../shared/emoji'
import Flex from '../shared/flex'

import TabListItem from './tab-list-item'

interface OwnProps {
  pocketId: PocketID
  color: string
}

interface StateProps {
  tabs: SavedTab[]
}

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
      <Flex
        column
        className="tab-list"
        gap={4}
        css={{
          overflow: 'auto',
          padding: 6,
          /* for Firefox */
          minHeight: 0,
          border: '0px dashed',
          borderColor: color,
          borderTop: 0,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4
        }}
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
            css={theme => ({
              height: 46,
              boxSizing: 'border-box',
              fontSize: '1.3em',
              fontWeight: 200,
              border: `2px dashed ${theme.colors.text}55`,
              opacity: 0.6
            })}
          >
            <span>{`Nothing but lint in here`}</span>
            <span>
              <Emoji emoji="🤷" />
            </span>
          </Flex>
        )}
      </Flex>
    )}
  </Droppable>
)

//
// 🕳️

export default connect(makeMapStateToProps)(TabList)
