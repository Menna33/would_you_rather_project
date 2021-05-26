import {RECEIVE_USERS,USER_ANSWER_QUESTION,USER_ADD_QUESTION} from '../constants'

export function getUsers(users) {
  return {
    type: RECEIVE_USERS,
    payload: { users },
  }
}
export function userAnswerQuestion({ authedUser, qid, answer }) {
  return { 
    type: USER_ANSWER_QUESTION,
     payload: { answer, qid, authedUser } }
}
export function userAddQuestion({ authedUser, qid }) {
  return { 
    type: USER_ADD_QUESTION, 
    payload: { authedUser, qid } }
}

