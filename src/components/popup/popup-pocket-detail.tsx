import * as React from 'react'
import { TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { Pocket, State } from '../../types'

interface Props {
  id?: string,
  isNew: boolean,
  pocket?: Pocket
}

const mapStateToProps = (state: State, ownProps: Props) => (
  ownProps.id ? { 
    ...ownProps, 
    pocket: state.pockets[ownProps.id] 
  } 
  : { ...ownProps }
)

const PopupPocketDetail = ({id, pocket, isNew}: Props) => (
  <form id="pocket-detail">
    <label>Name:</label><input type="text" value={pocket ? pocket.name : ''} />
    <TwitterPicker />
  </form>
)

export default connect(mapStateToProps)(PopupPocketDetail)
