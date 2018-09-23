import backgroundStore from '../stores'
import { addPocket } from '../actions'

// increment or decrement background counter every second
setInterval(() => {
  backgroundStore.dispatch(addPocket({
    "color": "#AABBCC",
    "name": "Tets Pock",
    "icon": ":banana:"
  }))
}, 9000)
