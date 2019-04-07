import * as React from 'react'

import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import { FlexCenter, FlexChild } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'

import TabList from './tab-list'

interface Props {
  pocket: Pocket
  handleEdit: (id: string) => void
}

const style = (color: string) => ({
  display: 'block',
  backgroundColor: color
})

export default ({ pocket, handleEdit }: Props) => {
  return (
    <div className="pocket-list-item" key={pocket.id}>
      <FlexCenter
        className="pocket-details"
        style={style(pocket.color)}
      >
        <PocketIcon icon={pocket.icon} />
        <FlexChild className="pocket-name">
          {pocket.name}
        </FlexChild>
        <FlexChild className="pocket-count">
          {pocket.tabs.length}
        </FlexChild>
        <FlexChild onClick={() => handleEdit(pocket.id)}>
          <Emoji emoji=":pencil2:" size={16} />
        </FlexChild>
      </FlexCenter>
      <TabList pocketId={pocket.id} />
    </div>
  )
}
