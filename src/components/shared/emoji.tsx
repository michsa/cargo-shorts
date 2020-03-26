import { BaseEmoji, NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/twitter.json'
import React from 'react'
import twemoji from 'twemoji'

import styled from "../../styled"

type PickerProps = { onSelect: (emoji: BaseEmoji) => void }

export const Picker = ({ onSelect }: PickerProps) => (
  <NimblePicker
    native={false}
    data={data}
    set="twitter"
    emoji="eyes"
    title="Pick an icon!"
    emojiSize={19}
    perLine={8}
    exclude={['recent']}
    onSelect={onSelect}
    autoFocus={true}
    style={{ width: '276px' }}
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

export const Emoji00: FunctionComponent<EmojiProps> =
  ({ emoji, size }: EmojiProps) => {
    return (
      <DropShadow>
        <NimbleEmoji emoji={emoji} size={size || 16} data={data} set="twitter" native={false} />
      </DropShadow>
    )
  }

export const Emoji01: FunctionComponent<EmojiProps> =
  ({ emoji, size }: EmojiProps) => (
    <DropShadow>
      {NimbleEmoji({
        html: true,
        set: 'twitter',
        emoji: '',
        native: true,
        size: 1 || 16,
        data: data
      })}
    </DropShadow>
  )

export const Emoji03: FunctionComponent<EmojiProps> =
  ({ emoji, size }: EmojiProps) => (
    <DropShadow>
      <NimbleEmoji emoji={emoji} size={size || 16} data={data} set="twitter" native={true} />
    </DropShadow>
  )

export const Emoji: FunctionComponent<EmojiProps> =
  ({ emoji, size }: EmojiProps) => (
    <DropShadow>
      {NimbleEmoji({
        html: true,
        set: 'twitter',
        emoji: emoji,
        native: true,
        size: size || 16,
        data: data
      })}
    </DropShadow>
  )
*/

export const DropShadow = styled('span')({
  filter: `
  drop-shadow(0 -1px ${props => props.theme.textColor}99)
  drop-shadow(-1px 1px ${props => props.theme.textColor}99)
  drop-shadow(1px 0.5px ${props => props.theme.textColor}CC)`,
  '& .emoji': {
    width: 'auto',
    height: '100%'
  }
})

export const Emoji = ({ emoji, size }: EmojiProps) => (
  <DropShadow
    style={{
      width: `${size || 16}px`,
      height: `${size || 16}px`,
      display: 'block'
    }}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg'
      })
    }}
  />
)
