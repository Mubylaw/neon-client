import { ADD_SCHOOL, UPDATE_SCHOOL, GET_SCHOOL } from '../actionTypes'

const school = (state = {}, action) => {
  switch (action.type) {
    case ADD_SCHOOL:
      return { ...action.school }
    case UPDATE_SCHOOL:
      return { ...action.school }
    case GET_SCHOOL:
      return { ...action.school }
    default:
      return state
  }
}

export default school
