import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth'
import jwtDecode from 'jwt-decode'
import ScrollToTop from '../hocs/scrollTop'

const store = configureStore()

if (
  localStorage.jwtToken !== 'undefined' &&
  localStorage.jwtToken !== undefined
) {
  setAuthorizationToken(localStorage.jwtToken)
  const decode = jwtDecode(localStorage.jwtToken)
  if (decode.exp * 1000 < Date.now()) {
    localStorage.clear()
    setAuthorizationToken(false)
    store.dispatch(setCurrentUser({}))
    window.location.href = '/signin'
  } else {
    // prevent someone from manually tampering with the jwtToken in localStorage
    try {
      store.dispatch(setCurrentUser({ ...jwtDecode(localStorage.jwtToken) }))
    } catch (e) {
      store.dispatch(setCurrentUser({}))
    }
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <div className="onboarding">
          <Main />
        </div>
      </ScrollToTop>
    </Router>
  </Provider>
)

export default App
