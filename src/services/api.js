import axios from 'axios'

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function apiCall(method, path, data, config) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](`${baseUrl}${path}`, data, config)
      .then((res) => {
        return resolve(res.data)
      })
      .catch((err) => {
        return reject(err.response.data.error)
      })
  })
}

export const baseUrl = 'https://neon-server-duiw.onrender.com'
// export const baseUrl = 'http://localhost:5000'
