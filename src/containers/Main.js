import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Homepage from '../components/Homepage'
import AuthForm from '../components/AuthForm'
import SchoolLanding from '../components/SchoolLanding'
import { authUser, forgotPassword, resetPassword } from '../store/actions/auth'
import { removeError } from '../store/actions/errors'
import Error from '../components/Error'

const Main = (props) => {
  const {
    authUser,
    errors,
    removeError,
    currentUser,
    forgotPassword,
    resetPassword,
  } = props
  return (
    <div className="neon-container">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Homepage
              currentUser={currentUser}
              removeError={removeError}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/signin"
          render={(props) => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                forgot={forgotPassword}
                school
                buttonText="Log in"
                heading="Welcome back"
                {...props}
              />
            )
          }}
        />
        <Route
          exact
          path="/signup"
          render={(props) => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                forgot={forgotPassword}
                signUp
                buttonText="Sign Up"
                heading="Sign up with Neon"
                {...props}
              />
            )
          }}
        />
        <Route
          exact
          path="/resetpassword"
          render={(props) => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                resetPass={resetPassword}
                reset
                buttonText="Reset"
                heading="Reset your password"
                {...props}
              />
            )
          }}
        />
        <Route
          path="/:tag/signin"
          render={(props) => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                forgot={forgotPassword}
                student
                buttonText="Log in"
                heading="Welcome back"
                {...props}
              />
            )
          }}
        />
        <Route
          path="/:tag"
          render={(props) => {
            return <SchoolLanding {...props} />
          }}
        />
        <Route
          path="/preview"
          render={(props) => {
            return <SchoolDashboard {...props} />
          }}
        />
        <Route
          path="*"
          render={(props) => <Error currentUser={currentUser} {...props} />}
        />
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    authUrl: state.authUrl,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    authUser,
    removeError,
    forgotPassword,
    resetPassword,
  })(Main)
)
