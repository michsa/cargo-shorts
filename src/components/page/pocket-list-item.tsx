import * as React from 'react'

import { Pocket } from '../../types'
import PocketDetails from '../shared/pocket-details'

import TabList from './tab-list'

interface Props {
  pocket: Pocket
  handleEdit: (id: string) => void
}

export default ({ pocket, handleEdit }: Props) => {
  return (
    <div className="pocket-list-item" key={pocket.id}>
      <PocketDetails
        pocket={pocket}
        onClick={() => null}
      />
      <TabList pocketId={pocket.id} />
    </div>
  )
}
