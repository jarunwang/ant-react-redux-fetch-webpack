import { handleActions } from 'redux-actions'

const test = (state, action) => {
  switch (action.type) {
    case 'ADD_TEST':
      return {
        id: action.id,
        name: action.name,
        age: action.age,
        address: action.address
      }
    case 'EDIT_TEST':
      return {
        id: action.id,
        name: action.name,
        age: action.age,
        address: action.address
      }
    default:
      return state
  }
}

const initData = [{
    id: '1',
    name: '胡彦斌0000',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    id: '2',
    name: '胡彦祖8888',
    age: 42,
    address: '西湖区湖底公园1号'
}];
  
export const testList = handleActions({
  'ADD_TEST'(state, action) {
    return [
      ...state,
      test(undefined, action.payload)
    ]
  },
  'EDIT_TEST'(state, action) {
    let list = state;
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].id == action.payload.id) {
          list[i] = test(undefined, action.payload);
      }
    }

    return list;
  },
  'DEL_TEST'(state, action) {
    return state.filter(i => i.id != action.payload.id)
  }
}, initData)


const setSeachInit = {
    name: '',
    age: '',
    address: '',
}

export const searchText = handleActions({
  'SEARCH_TEST'(state, action){
    console.log(action)
    return {
            name : {value: action.payload.name,type: action.payload.type},
            age : {value: action.payload.age,type: action.payload.type},
            address : {value: action.payload.address,type: action.payload.type},
          };
  } 
},setSeachInit)