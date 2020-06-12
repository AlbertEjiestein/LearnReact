import Immutable from 'immutable'

const initState = Immutable.fromJS({
  count: 100
})

export default (state=initState, action) => {
  switch(action.type){
    case 'INCREMENT':
      return state.updateIn(['count'], v => v + 1)
    case 'DECREMENT':
      return state.update('count', v => v - 1)
    default:
      return state
  }
}