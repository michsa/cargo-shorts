import { EmojiData, NimbleEmoji, NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/twitter.json'
import React, { FunctionComponent } from 'react'

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

export const Emoji: FunctionComponent<EmojiProps> = ({ emoji, size }) => (
  <NimbleEmoji emoji={emoji} size={size || 16} data={data} />
)
