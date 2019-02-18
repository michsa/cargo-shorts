import * as React from 'react'

import { Pocket } from '../../types'
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

const PocketListItem = ({ pocket, handleEdit }: Props) => {
  return (
    <li id="pocket-list-item" key={pocket.id}>
      <div
        id="pocket-list-item-details"
        style={style(pocket.color)}
      >
        <PocketIcon icon={pocket.icon} />
        <span id="pocket-name">{pocket.name} </span>
        <span id="pocket-count"> {pocket.tabs.length} </span>
        <span onClick={() => handleEdit(pocket.id)}> edit </span>

        <TabList pocket={pocket}/>
      </div>
    </li>
  )
}

export default PocketListItem
