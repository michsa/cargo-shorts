/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  BaseEmoji,
  NimblePicker as EmojiPicker,
  Emoji as EmojiComponent,
  getEmojiDataFromNative,
  Data
} from 'emoji-mart'
import data from 'emoji-mart/data/twitter.json'

import styled from '../../styled'

type PickerProps = { onSelect: (emoji: BaseEmoji) => void }

export const Picker = ({ onSelect }: PickerProps) => (
  <EmojiPicker
    autoFocus={true}
    css={{
      'div.twitter-picker': {
        border: '0 !important',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 4px 1px !important',
        borderRadius: '4px !important'
      }
    }}
    data={(data as unknown) as Data}
    emoji="eyes"
    emojiSize={19}
    exclude={['recent']}
    onSelect={onSelect}
    perLine={8}
    set="twitter"
    style={{ width: '276px' }}
    title="Pick an icon!"
  />
)

interface EmojiProps {
  emoji: string | BaseEmoji
  size?: number
}

export const DropShadow = styled.span(props => ({
  filter: `
  drop-shadow(0 -1px ${props.theme.colors.text}99)
  drop-shadow(-1px 1px ${props.theme.colors.text}99)
  drop-shadow(1px 0.5px ${props.theme.colors.text}CC)`,
  '& .emoji': {
    width: 'auto',
    height: '100%'
  }
}))

const convertEmoji = (emoji: string | BaseEmoji): BaseEmoji =>
  typeof emoji === 'string'
    ? getEmojiDataFromNative(emoji, 'twitter', (data as unknown) as Data)
    : emoji

export const Emoji = ({
  emoji,
  size,
  ...props
}: EmojiProps) => {
  const emojiObj = convertEmoji(emoji)
  return (
    <div
      css={{
        display: 'contents',
        // targets the span wrapper around the image; otherwise it takes up
        // vertical space and messes up alignments
        '.emoji-mart-emoji': { width: size, height: size }
      }}
    >
      <EmojiComponent
        //data={(data as unknown) as Data}
        emoji={emojiObj}
        native={false}
        set="twitter"
        size={size || 14}
        skin={emojiObj.skin || undefined}
        {...props}
      />
    </div>
  )
}
