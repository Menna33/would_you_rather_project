  
import {SET_AUTHED_USER,CLEAR_AUTHED_USER } from '../constants'

export function setAuthedUser(userId) {
  return {
    type: SET_AUTHED_USER,
    payload: { userId },
  }
}

export function clearAuthedUser() {
  return {
    type: CLEAR_AUTHED_USER,
  }
}