import * as React from 'react'
import { Pocket } from '../../types'
import * as emoji from 'node-emoji'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

const style = (color, isActive) => ({
  backgroundColor: isActive ? color : '#fafafa',
  boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15)`
})

const PopupPocketListItem = ({pocket, isActive, handleEdit, handleClick}: Props) => {
  // const editPocket = () => editHandler(pocket.id)
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
        <span id="pocket-name">{pocket.name}</span>
        <span id="pocket-count">{pocket.tabs.length}</span>
      </div>
      <i id="edit-pocket" className="ui icon pencil" onClick={() => handleEdit(pocket.id)} />
    </li>
  )
}

export default PopupPocketListItem
