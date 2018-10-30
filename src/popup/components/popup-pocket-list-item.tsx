import * as React from 'react'
import { Pocket } from '../../types'
import * as emoji from 'node-emoji'

interface Props {
  pocket: Pocket,
  key: number,
  isActive: boolean
}

const style = (color, isActive) => ({
  backgroundColor: isActive ? color : '#fafafa',
  boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15)`
})

const PopupPocketListItem = ({pocket, isActive}: Props) => (
  <div id="pocket-list-item-details" style={style(pocket.color, isActive)}>
    <span id="pocket-icon">{
      emoji.hasEmoji(pocket.icon) 
      ? emoji.get(pocket.icon) 
      : emoji.random().emoji
    }</span>
    <span id="pocket-name">{pocket.name}</span>
    <span id="pocket-count">{pocket.tabs.length}</span>
  </div>
)

export default PopupPocketListItem
