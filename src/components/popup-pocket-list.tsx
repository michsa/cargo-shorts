import * as React from 'react'
import PopupPocket from './popup-pocket'

interface Props {
  pockets: string[]
}

const PopupPocketList = (props: Props) => {
  return (
    <ul>
    {props.pockets.map((pocket, index) => 
      <PopupPocket name={pocket} key={index}/>
    )}
    </ul>
  )
}

export default PopupPocketList
