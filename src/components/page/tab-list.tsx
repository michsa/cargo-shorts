/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { ReactSortable } from 'react-sortablejs'

import { makeGetOrderedTabs } from '../../redux/selectors'
import { PocketID, SavedTab, State } from '../../types'
import { Emoji } from '../shared/emoji'
import Flex from '../shared/flex'

import { GridContext } from './pocket-list'
import TabListItem from './tab-list-item'

interface OwnProps {
  pocketId: PocketID
  color: string
}

interface StateProps {
  tabs: SavedTab[]
}

const makeMapStateToProps = () => (state: State, { pocketId }: OwnProps) =>
  ({
    tabs: makeGetOrderedTabs()(state, pocketId)
  } as StateProps)

const TabList = ({ tabs, color }: StateProps & OwnProps) => {
  const [state, setState] = useState(tabs)
  const grid = useContext(GridContext)
  return (
    <Flex
      column
      className="tab-list"
      css={{
        overflow: 'hidden',
        padding: 6,
        border: '0px dashed',
        borderColor: color,
        borderTop: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        position: 'relative',
        '> div': { minHeight: 46 }
      }}
    >
      {!state.length && (
        <Flex
          center
          gap={8}
          css={theme => ({
            boxSizing: 'border-box',
            fontSize: '1.3em',
            fontWeight: 200,
            border: `2px dashed ${theme.colors.text}44`,
            opacity: 0.6,
            position: 'absolute',
            top: 6,
            left: 6,
            bottom: 6,
            right: 6
          })}
        >
          <span>{`Nothing but lint in here`}</span>
          <span>
            <Emoji emoji="🤷" />
          </span>
        </Flex>
      )}
      <ReactSortable
        group="tabs"
        list={state}
        animation={200}
        setList={x => {
          console.log(
            'setList',
            x.map(t => t.id)
          )
          setState(x)
        }}
        onChange={() => grid && grid.update()}
      >
        {state.map((tab, index) => (
          <TabListItem tab={tab} key={tab.id} index={index} />
        ))}
      </ReactSortable>
    </Flex>
  )
}

// 🕳️

export default connect(makeMapStateToProps)(TabList)
