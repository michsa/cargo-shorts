import React from 'react'

import { Emoji } from './emoji'

type Props = { icon: string }

const PocketIcon = ({ icon }: Props) => (
  <div className="pocket-icon">
    <Emoji emoji={icon} size={16} />
  </div>
)
export default PocketIcon
