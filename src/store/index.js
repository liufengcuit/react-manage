import { createStore, combineReducers } from 'redux';


const todo = (state = [], action) => {
    console.log(state)
    console.log(action)

    return state;
}




const store = createStore(
    combineReducers({
        todo
    })
)

export default store;