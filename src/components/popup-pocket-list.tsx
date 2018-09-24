import { State, Pocket } from '../constants'
import { orderedPocketSelector } from '../selectors'
import { connect } from 'react-redux';

import * as React from 'react'
import PopupPocket from './popup-pocket'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) => ({
    pockets: orderedPocketSelector(state)
} as Props)

/*
const mapDispatchToProps = (dispatch) => ({
  onTodoClick
})
*/

const PopupPocketList = (props: Props) => {
  return (
    <ul>
    {props.pockets.map((pocket, index) => 
      <PopupPocket pocket={pocket} key={index}/>
    )}
    </ul>
  )
}

export default connect(mapStateToProps)(PopupPocketList)
