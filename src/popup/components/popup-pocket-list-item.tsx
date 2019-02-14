import * as React from 'react'
import { Pocket } from '../../types'
import * as emoji from 'node-emoji'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

const style = (color: string, isActive: boolean) => ({
  display: 'block',
  backgroundColor: isActive ? color : '#fafafa'
})

const PopupPocketListItem = ({ pocket, isActive, handleEdit, handleClick }: Props) => {
  const doClick = () => handleClick(pocket.id)
  return (
    <li id="pocket-list-item" key={pocket.id}>
      <div
        id="pocket-list-item-details"
        style={style(pocket.color, isActive)}
        onClick={doClick}
      >
        <span id="pocket-icon">{
          emoji.hasEmoji(pocket.icon)
            ? emoji.get(pocket.icon)
            : emoji.random().emoji
        }</span>
        <span id="pocket-name">{pocket.name} </span>
        <span id="pocket-count"> {pocket.tabs.length} </span>
        <span onClick={() => handleEdit(pocket.id)}> edit </span>
        <span> {isActive ? 'active! :D' : 'not active :('}</span>
      </div>
    </li>
  )
}

export default PopupPocketListItem
