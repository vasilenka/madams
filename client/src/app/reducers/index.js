import { createStore, combineReducers } from 'redux';

import projects from './ProjectReducer';
import users from './UserReducer';

const rootReducer = createStore(
    combineReducers({
        projects,
        users
    })
)

export default rootReducer;