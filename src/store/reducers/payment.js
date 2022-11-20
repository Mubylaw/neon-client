import { GET_PATHWAY_FULL_URL, GET_PATHWAY_SUB_URL } from '../actionTypes'

const payment = (
  state = { mentorHourUrl: null, pathwayFullUrl: null },
  action
) => {
  switch (action.type) {
    case GET_PATHWAY_FULL_URL:
      return { pathwayFullUrl: action.url }
    case GET_PATHWAY_SUB_URL:
      return { pathwaySubUrl: action.url }
    default:
      return state
  }
}

export default payment
