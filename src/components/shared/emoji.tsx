import { EmojiData, NimbleEmoji, NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/twitter.json'
import React, { FunctionComponent } from 'react'

import styled from '../../styled-components'

export const Picker: FunctionComponent<{ onSelect: (emoji: EmojiData) => void }> =
  ({ onSelect }) => (
    <NimblePicker
      native={true}
      data={data}
      emoji=":eye-in-speech-bubble:"
      title="Pick an icon!"
      emojiSize={18}
      perLine={8}
      exclude={['recent']}
      onSelect={onSelect}
    />
  )

interface EmojiProps {
  emoji: string
  size?: number
}

/*
export const Emoji: FunctionComponent<EmojiProps> =
  styled(({ emoji, size }: EmojiProps) => (
    <NimbleEmoji emoji={emoji} size={size || 16} data={data} set="twitter" />
  )) <{}>`
filter:
  drop-shadow(-1px -1px 0 ${props => props.theme.textColor})
  drop-shadow(-1px 1px 0 ${props => props.theme.textColor})
  drop-shadow(1px -1px 0 ${props => props.theme.textColor})
  drop-shadow(1px 1px 0 ${props => props.theme.textColor});
`
*/

const a = "1px"
const b = "0.5px"
export const DropShadow = styled('span')`
filter:
  drop-shadow(-${b} -${b} 0 ${props => props.theme.textColor}CC)
  drop-shadow(-${b} ${a} 0 ${props => props.theme.textColor}FF)
  drop-shadow(${a} -${b} 0 ${props => props.theme.textColor}FF)
  drop-shadow(${a} ${a} 0 ${props => props.theme.textColor}FF);
`

export const Emoji: FunctionComponent<EmojiProps> =
  ({ emoji, size }: EmojiProps) => (
    <DropShadow className="drop-shadow">
      <NimbleEmoji emoji={emoji} size={size || 16} data={data} set="twitter" native={true} />
    </DropShadow>
  )
