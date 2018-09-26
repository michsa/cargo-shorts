import { State, Tab } from '../../types'
// import { currentTabInfoSelector } from '../../redux/selectors'
import { connect } from 'react-redux';

import * as React from 'react'
// import PopupPocket from './popup-pocket'
import TabInfo from './tab-info';

interface Props {
  // pockets: Pocket[],
  tab: Tab
}

const mapStateToProps = (state: State) => ({
    // pockets: orderedPocketSelector(state),
    tab: state.tabs.current
} as Props)

/*
const mapDispatchToProps = (dispatch) => ({
  onTodoClick
})
*/

const PopupPocketList = (props: Props) => (
  <ul>
    <TabInfo url={props.tab.url} title={props.tab.title}/>
    {`hello world`}
  </ul>
)

export default connect(mapStateToProps)(PopupPocketList)
/*
{props.pockets.map((pocket, index) => 
  <PopupPocket pocket={pocket} key={index}/>
)}
*/