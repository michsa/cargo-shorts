import { BaseEmoji } from 'emoji-mart'
import React from 'react'

import { Emoji } from './emoji'

type Props = { icon: string | BaseEmoji }

const PocketIcon = ({ icon }: Props) => <Emoji emoji={icon} size={16} />

export default PocketIcon
