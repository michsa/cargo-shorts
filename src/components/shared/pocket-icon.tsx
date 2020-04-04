/** @jsx jsx */
import { jsx } from '@emotion/core'
import { BaseEmoji } from 'emoji-mart'

import { Emoji } from './emoji'

type Props = { icon: string | BaseEmoji }

const PocketIcon = ({ icon }: Props) => (
    <Emoji emoji={icon} size={16} css={{ height: 10 }} />
)

export default PocketIcon
