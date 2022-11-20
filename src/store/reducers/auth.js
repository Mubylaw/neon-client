import { GET_GOOGLE_URL } from '../actionTypes'

const authUrl = (state = { url: null }, action) => {
  switch (action.type) {
    case GET_GOOGLE_URL:
      return { url: action.url }
    default:
      return state
  }
}

export default authUrl
