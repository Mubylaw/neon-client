import { apiCall } from '../../services/api'
import { addError, removeError } from './errors'
import { ADD_SCHOOL, UPDATE_SCHOOL, GET_SCHOOL } from '../actionTypes'

export const addSchool = (school) => ({
  type: ADD_SCHOOL,
  school,
})

export const updateSchool = (school) => ({
  type: UPDATE_SCHOOL,
  school,
})

export const getSchool = (school) => ({
  type: GET_SCHOOL,
  school,
})

export const addSchoolFn = (school) => {
  return (dispatch) => {
    return apiCall('post', '/api/v1/schools', school)
      .then(({ data }) => {
        dispatch(addSchool(data))
        dispatch(removeError())
      })
      .catch((err) => {
        dispatch(addError(err))
      })
  }
}

export const updateSchoolFn = (school, id) => {
  return (dispatch) => {
    return apiCall('put', `/api/v1/schools/${id}`, school)
      .then(({ data }) => {
        dispatch(updateSchool(data))
        dispatch(removeError())
      })
      .catch((err) => {
        dispatch(addError(err))
      })
  }
}

export const getSchoolFn = (id) => {
  return (dispatch) => {
    return apiCall('get', `/api/v1/schools/${id}`)
      .then(({ data }) => {
        dispatch(getSchool(data))
        dispatch(removeError())
      })
      .catch((err) => {
        dispatch(addError(err))
      })
  }
}

export const getSchoolByTagFn = (id) => {
  return (dispatch) => {
    return apiCall('get', `/api/v1/schools/tag/${id}`)
      .then(({ data }) => {
        dispatch(getSchool(data))
        dispatch(removeError())
      })
      .catch((err) => {
        dispatch(addError(err))
      })
  }
}

export const getSchoolsFn = () => {
  return (dispatch) => {
    return apiCall('get', `/api/v1/schools`)
      .then(({ data }) => {
        dispatch(getSchools(data))
        dispatch(removeError())
      })
      .catch((err) => {
        dispatch(addError(err))
      })
  }
}

export const uploadStudents = (id, data) => {
  return (dispatch) => {
    return apiCall('post', `/api/v1/schools/${id}/students`, data)
      .then(({ data }) => {
        dispatch(updateSchool(data))
        dispatch(removeError())
      })
      .catch((err) => {
        reject(err)
      })
  }
}
