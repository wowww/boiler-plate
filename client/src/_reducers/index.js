import { combineReducers } from 'redux';
import user from './user_reducer';
// 여러개의 리듀서에서 하나로 합치게 된다.

const rootReducer = combineReducers({
    user
})


export default rootReducer;