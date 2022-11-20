import { apiCall } from '../../services/api'
import { addError, removeError } from './errors'
import { setCurrentUser, setAuthorizationToken } from './auth'

export const updateUser = (data, config) => (dispatch, getState) => {
  let { currentUser } = getState()
  var id = currentUser.user.id
  if (!id) {
    id = currentUser.user.user.id
  }
  return apiCall('put', `/api/v1/users/${id}`, data, config)
    .then(({ token, ...user }) => {
      // make an admin safe feature that is updating users without setting auth headers
      if (token) {
        localStorage.setItem('jwtToken', token)
        setAuthorizationToken(token)
        dispatch(setCurrentUser(user.user))
      }
      dispatch(removeError())
    })
    .catch((err) => {
      dispatch(addError(err))
    })
}

export function getUser(id, action) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall('get', `/api/v1/users/${id}`)
        .then(({ user, data }) => {
          if (action === 'user') {
            if (!user) {
              dispatch(setCurrentUser(data))
              dispatch(removeError())
              resolve(data)
            } else {
              dispatch(setCurrentUser(user))
              dispatch(removeError())
              resolve(user)
            }
          }
        })
        .catch((err) => {
          dispatch(addError(err))
          reject()
        })
    })
  }
}
