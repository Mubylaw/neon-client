import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      profileImgUrl: '',
      view: false,
      tempErr: '',
      loc: {},
      show: false,
      success: false,
      code: '',
      pin: false,
      extension: '',
      color: '',
      logo: '',
    }
  }

  componentDidMount() {
    this.props.removeError()
    if (this.props.location.state) {
      this.setState({
        tempErr: this.props.location.state.err,
        logo: this.props.location.state.logo,
        color: this.props.location.state.color,
        loc: this.props.location.state,
      })
    }
    console.log(this.props.school)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      tempErr: '',
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.view === false) {
      this.setState({ view: true })
    }
    const authType = this.props.signUp ? 'register' : 'login'
    const { email, password, firstName, profileImgUrl, lastName } = this.state
    this.props
      .onAuth(authType, {
        email,
        password,
        school: this.props.school,
        firstName,
        lastName,
        profileImgUrl,
      })
      .then(() => {
        if (this.props.location.state) {
          this.props.history.push(this.props.location.state.from)
        } else if (this.state.loc.state) {
          this.props.history.push(this.state.loc.state.from)
        } else {
          this.props.history.push('/')
        }
      })
      .catch(() => {
        this.setState({ view: false })
        return
      })
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  handleShow = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  handleCancel = () => {
    this.setState({
      success: false,
    })
  }

  render() {
    const { email, firstName, lastName, tempErr, logo, color } = this.state
    const {
      heading,
      buttonText,
      signUp,
      errors,
      history,
      removeError,
      student,
    } = this.props

    history.listen(() => {
      removeError()
    })

    return (
      <div>
        {!student ? (
          <div className="auth-container">
            <div className="image">
              <img
                src="https://iea.imgix.net/baf1e3a9-a015-4917-8206-021234e74453/matthew-hamilton-Ru3Ap8TNcsk-unsplash.jpg?auto=compress%2Cformat&fit=min&q=80&rect=1710%2C0%2C3648%2C3648"
                alt="Neon auth"
              />
            </div>
            <div className="auth">
              <div className="header">
                <img src="https://i.imgur.com/QI75xJ8.png" alt="Neon logo" />
              </div>
              <div className="title">{heading}</div>
              <div>
                <form action="" onSubmit={this.handleSubmit}>
                  {!errors.message ? (
                    ''
                  ) : (
                    <div className="alert alert-danger">{errors.message}</div>
                  )}
                  {!tempErr ? (
                    ''
                  ) : (
                    <div className="alert alert-danger">{tempErr}</div>
                  )}
                  {signUp && (
                    <div className="nam">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="type"
                            className="form-control"
                            id="FirstName"
                            name="firstName"
                            onChange={this.handleChange}
                            value={firstName}
                            placeholder="Ex: Sam"
                          />
                          <label htmlFor="FirstName">First Name</label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="type"
                            className="form-control"
                            id="LastName"
                            name="lastName"
                            onChange={this.handleChange}
                            value={lastName}
                            placeholder="Ex: Smith"
                          />
                          <label htmlFor="LastName">Last Name</label>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={this.handleChange}
                      value={email}
                      placeholder="Example@gmail.com"
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={this.handleChange}
                      placeholder="Ex: Jdj%u4@8$53"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="links">
                    <button
                      type="submit"
                      className={`btn ${this.state.view ? 'btn-load' : ''}`}
                    >
                      <span className="btn_text">{buttonText}</span>
                    </button>
                  </div>
                </form>
                <div className="footnotes">
                  {!signUp ? (
                    <div className="existing">
                      Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                  ) : (
                    <div className="existing">
                      Have an account? <Link to="/signin">Sign in</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="school-auth">
            <div className="content" style={{ background: color }}>
              <img
                src={logo ? logo : 'https://i.imgur.com/QI75xJ8.png'}
                alt="Neon"
              />
              <h1>Welcome back</h1>
              <form onSubmit={this.handleSubmit}>
                {!errors.message ? (
                  ''
                ) : (
                  <div className="alert alert-danger">{errors.message}</div>
                )}
                {!tempErr ? (
                  ''
                ) : (
                  <div className="alert alert-danger">{tempErr}</div>
                )}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                    placeholder="Example@gmail.com"
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Ex: Jdj%u4@8$53"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="links">
                  <button
                    type="submit"
                    className={`btn ${this.state.view ? 'btn-load' : ''}`}
                    style={{ color }}
                  >
                    <span className="btn_text">Log in</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="background" style={{ background: color }}></div>
          </div>
        )}
      </div>
    )
  }
}
