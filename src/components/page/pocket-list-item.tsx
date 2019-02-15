import * as emoji from 'node-emoji'
import * as React from 'react'

import { Pocket } from '../../types'

interface Props {
  pocket: Pocket
  handleEdit: (id: string) => void
}

const style = (color: string) => ({
  display: 'block',
  backgroundColor: color
})

const PopupPocketListItem = ({ pocket, handleEdit }: Props) => {
  return (
    <li id="pocket-list-item" key={pocket.id}>
      <div
        id="pocket-list-item-details"
        style={style(pocket.color)}
      >
        <span id="pocket-icon">{
          emoji.hasEmoji(pocket.icon)
            ? emoji.get(pocket.icon)
            : emoji.random().emoji
        }</span>
        <span id="pocket-name">{pocket.name} </span>
        <span id="pocket-count"> {pocket.tabs.length} </span>
        <span onClick={() => handleEdit(pocket.id)}> edit </span>

      </div>
    </li>
  )
}

export default PopupPocketListItem
