import { CLEAR_AUTHED_USER, SET_AUTHED_USER } from '../constants'

export default function authedUser(authedUser = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER: {
      const { userId } = action.payload
      return userId
    }
    case CLEAR_AUTHED_USER: {
      return null
    }
    default:
      return authedUser
  }
}