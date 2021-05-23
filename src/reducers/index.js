import { combineReducers } from 'redux'
import authedUser from './authedUser.reducer'
import users from './users.reducer'
import questions from './questions.reducer'

const rootReducer=combineReducers({
  authedUser,
  users,
  questions
}) 

export default rootReducer;