import { combineReducers } from 'redux'
import * as todoList from './todoList'
import * as musicList from './music'
import * as testList from './test'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  router: routerReducer,
  ...todoList,
  ...musicList,
  ...testList,
})

export default rootReducer