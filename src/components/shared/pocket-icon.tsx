import { Emoji } from 'emoji-mart'
import React from 'react'

type Props = {
  icon: string
}

export default ({icon}: Props) => (
  <div className="pocket-icon">
    <Emoji emoji={icon} native={true} size={16} />
  </div>
)
