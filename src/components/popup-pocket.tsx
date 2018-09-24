import * as React from 'react'
import { Pocket} from '../constants'
import * as emoji from 'node-emoji'

interface Props {
  pocket: Pocket
}
/*
const style = (color) => ({
  backgroundColor: color
})
*/

const PopupPocket = (props: Props) => (
  <li style={{backgroundColor: props.pocket.color}}>
    <span>{(icon = props.pocket.icon) => 
        emoji.hasEmoji(icon) ? emoji.get(icon) : emoji.random().emoji}</span>
    <span>{props.pocket.name}</span>
  </li>
)

export default PopupPocket