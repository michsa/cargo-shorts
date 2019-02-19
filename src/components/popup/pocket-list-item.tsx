import * as React from 'react'

import { Pocket } from '../../types'
import PocketIcon from '../shared/pocket-icon'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

const style = (color: string, isActive: boolean) => ({
  backgroundColor: isActive ? color : '#fafafa'
})

const PopupPocketListItem = ({ pocket, isActive, handleEdit, handleClick }: Props) => {
  const doClick = () => handleClick(pocket.id)
  return (
    <li className="pocket-list-item" key={pocket.id}>
      <div
        className="pocket-list-item-details"
        style={style(pocket.color, isActive)}
        onClick={doClick}
      >
        <PocketIcon icon={pocket.icon}/>
        <div className="pocket-name">{pocket.name} </div>
        <div className="pocket-count"> {pocket.tabs.length} </div>
        <div className="edit-pocket" onClick={() => handleEdit(pocket.id)}> edit </div>
      </div>
    </li>
  )
}

export default PopupPocketListItem
