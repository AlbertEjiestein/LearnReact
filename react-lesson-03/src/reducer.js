import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
import { combineReducers } from 'redux'

// reducer
function todos(state=[], action){
  switch(action.type){
    case ADD_TODO:
      return [
        ...state, 
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if(action.index === index){
          return {...todo, completed: !todo.completed}
        }
        return todo
      })
    default:
      return state
  }
}

function visibilityFilter(state=VisibilityFilters.SHOW_ALL, action){
  switch(action.type){
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

// 方法一
// function todoApp(state=initialState, action){
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }


const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
