import * as React from 'react'

interface Props {
  name: string
}

const PopupPocket = (props: Props) => {
  return (
    <li>
      <span>{props.name}</span>
    </li>
  )
}

export default PopupPocket
