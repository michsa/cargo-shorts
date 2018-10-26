import * as React from 'react'
import { Pocket } from '../../types'
import * as emoji from 'node-emoji'

interface Props {
  pocket: Pocket,
  key: number
}

/*
const style = (color) => ({
  backgroundColor: color
})
*/

const PopupPocketListItem = ({pocket}: Props) => (
  <li style={{backgroundColor: pocket.color}}>
    <span>{(icon = pocket.icon) => 
        emoji.hasEmoji(icon) ? emoji.get(icon) : emoji.random().emoji}</span>
    <span>{pocket.name}</span>
  </li>
)

export default PopupPocketListItem
