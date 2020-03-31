import {
  BaseEmoji,
  Picker as EmojiPicker,
  Emoji as EmojiComponent,
  getEmojiDataFromNative,
  Data
} from 'emoji-mart'
import data from 'emoji-mart/data/all.json'
import React, { FC } from 'react'
import twemoji from 'twemoji'

import styled from '../../styled'
type PickerProps = { onSelect: (emoji: BaseEmoji) => void }

export const Picker = ({ onSelect }: PickerProps) => (
  <EmojiPicker
    set="twitter"
    emoji="eyes"
    title="Pick an icon!"
    emojiSize={19}
    perLine={8}
    exclude={['recent']}
    onSelect={onSelect}
    autoFocus={true}
    style={{ width: '276px' }}
    css={{
      'div.twitter-picker': {
        border: '0 !important',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 4px 1px !important',
        borderRadius: '4px !important'
      }
    }}
  />
)

interface EmojiProps {
  emoji: string
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

// export const EmojiX: FC<EmojiProps> = styled(({ emoji, size }: EmojiProps) => (
//   <NimbleEmoji
//     emoji={emoji}
//     size={size || 16}
//     data={(data as unknown) as Data}
//     set="twitter"
//   />
// ))<{}>(props => ({
//   filter: `
//   drop-shadow(-1px -1px 0 ${props.theme.colors.text})
//   drop-shadow(-1px 1px 0 ${props.theme.colors.text})
//   drop-shadow(1px -1px 0 ${props.theme.colors.text})
//   drop-shadow(1px 1px 0 ${props.theme.colors.text});
// `
// }))

export const Emoji: FC<EmojiProps> = ({ emoji, size }: EmojiProps) => {
  return (
    <DropShadow>
      <EmojiComponent
        emoji={getEmojiDataFromNative(
          emoji,
          'twitter',
          (data as unknown) as Data
        )}
        size={size || 14}
        set="twitter"
        native={false}
      />
    </DropShadow>
  )
}

// export const Emoji01: FC<EmojiProps> = ({ emoji, size }: EmojiProps) => (
//   <DropShadow>
//     {EmojiComponent({
//       html: true,
//       set: 'twitter',
//       emoji: emoji,
//       // native: true,
//       size: 1 || 16 || size,
//       data: (data as unknown) as Data
//     })}
//   </DropShadow>
// )

// export const Emoji4: FC<EmojiProps> = ({ emoji, size }: EmojiProps) => (
//   <DropShadow>
//     {EmojiComponent({
//       html: true,
//       set: 'twitter',
//       emoji: emoji,
//       native: true,
//       size: size || 16,
//       data: (data as unknown) as Data
//     })}
//   </DropShadow>
// )

export const Emoji5 = ({ emoji, size }: EmojiProps) => (
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
