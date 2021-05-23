import { ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS } from '../constants'

export default function questionsReducer(questions = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS: {
      return {
        ...questions,
        ...action.payload.questions,
      }
    }
    case ADD_QUESTION: {
      const { question } = action.payload
      return {
        ...questions,
        [question.id]: question,
      }
    }
    case ANSWER_QUESTION: {
      const { authedUser, qid, answer } = action.payload
      const selectedOption = questions[qid][answer]
      return {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...selectedOption,
            votes: [...selectedOption.votes, authedUser],
          },
        },
      }
    }
    default:
      return questions
  }
}