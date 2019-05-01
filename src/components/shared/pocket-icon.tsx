import React from 'react'

import { Emoji } from './emoji'

type Props = { icon: string }

export default ({icon}: Props) => (
  <div className="pocket-icon">
    <Emoji emoji={icon} size={16} />
  </div>
)
