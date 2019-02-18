import * as emoji from 'node-emoji'
import * as React from 'react'

type Props = {
  icon: string
}

export default ({icon}: Props) => (
  <span id="pocket-icon">{
    emoji.hasEmoji(icon)
      ? emoji.get(icon)
      : emoji.random().emoji
  }</span>
)
