import { ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS } from '../constants'
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { userAddQuestion, userAnswerQuestion } from './users.action'

export function getQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    payload: { questions },
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    payload: { question },
  }
}

export function handleAddQuestion({ optionOneText, optionTwoText, author }) {
  console.log(`optionOneText ${optionOneText} optionTwoText ${optionTwoText}`
  ) 
  return (dispatch) => {

    return _saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(userAddQuestion({ authedUser: author, qid: question.id }))
        dispatch(addQuestion(question))
      }
    )
  }
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    payload: { authedUser, qid, answer },
  }
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(userAnswerQuestion({ authedUser, qid, answer }))
      dispatch(answerQuestion({ authedUser, qid, answer }))
    })
  }
}