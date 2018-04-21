import { combineReducers } from 'redux'
import * as testList from './test'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  router: routerReducer,
  ...testList,
})

export default rootReducer