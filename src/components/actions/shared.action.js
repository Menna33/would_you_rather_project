import { getInitialData } from '../utils/api'
import { getUsers } from './users.action'
import { setAuthedUser } from './authedUser.action'
import { getQuestions } from './questions.action'

const AUTHED_ID = "LoggedOut" //if LoggedOut->no logged in user

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(getUsers(users))
        dispatch(getQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
} 