import React, { Component } from 'react'
import { getSchoolByTagFn } from '../store/actions/school'
import { logout } from '../store/actions/auth'
import { connect } from 'react-redux'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

class NewDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      err: false,
      bio: '',
      tag: '',
      twitter: '',
      header: '',
      logo: '',
      linkedIn: '',
      no: '',
      address: '',
      facebook: '',
      instagram: '',
      name: '',
      slug: '',
      color: '',
    }
  }

  componentDidMount() {
    const tag = this.props.history.location.pathname.split('/')[1]
    this.props
      .getSchoolByTagFn(tag)
      .then(() => {
        const { school } = this.props
        if (school.name) {
          this.setState({
            bio: school.bio,
            tag: school.tag,
            twitter: school.twitter,
            header: school.header,
            logo: school.logo,
            linkedIn: school.linkedIn,
            no: school.no,
            address: school.address,
            facebook: school.facebook,
            instagram: school.instagram,
            name: school.name,
            slug: school.slug,
            color: school.color,
          })
        } else {
          this.setState({
            err: true,
          })
        }
      })
      .catch(() => {
        this.setState({
          err: true,
        })
      })
  }

  sendAuth = (e) => {
    e.preventDefault()
    const { slug, color, logo } = this.state
    this.props.history.push(`/${slug}/signin`, {
      color,
      logo,
    })
  }

  render() {
    const { currentUser } = this.props
    var {
      err,
      bio,
      tag,
      twitter,
      header,
      logo,
      name,
      linkedIn,
      no,
      address,
      facebook,
      instagram,
      slug,
      color,
    } = this.state

    return (
      <div className="dash-hero">
        {err ? (
          <div className="school-landing">
            <div className="hero">
              <div className="header">
                <div className="logo">
                  <img src="https://i.imgur.com/QI75xJ8.png" alt="Neon" />
                </div>
                <div className="nav-link">
                  <a className="nav-item" href="/">
                    Home
                  </a>
                </div>
              </div>
              <div className="content">
                <h1>Error 404, School not found</h1>
                <p>
                  We are really sorry but it seems we can not find this school
                </p>
                <a className="btn" href="/">
                  Go home
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="school-landing">
            <div className="hero">
              <div className="header">
                <div className="logo">
                  <img
                    src={logo ? logo : 'https://i.imgur.com/QI75xJ8.png'}
                    alt="Neon"
                  />
                </div>
                <div className="nav-link">
                  <a href="#" className="nav-item">
                    Home
                  </a>
                  <a href="#about" className="nav-item">
                    About
                  </a>
                  <a href="#contact" className="nav-item">
                    Contact Us
                  </a>
                  <a href="" className="nav-item" onClick={this.sendAuth}>
                    Sign in
                  </a>
                </div>
              </div>
              <div className="content">
                <h1>{header}</h1>
                <p>{tag}</p>
                <a href="#about" style={{ background: color }} className="btn">
                  Learn More
                </a>
              </div>
            </div>
            <div className="about" style={{ background: color }} id="about">
              <h1>About</h1>
              <p>{bio}</p>
            </div>
            <div className="footer" id="contact">
              <div className="info head">
                <div className="logo">
                  <img
                    src={logo ? logo : 'https://i.imgur.com/QI75xJ8.png'}
                    alt="Neon"
                  />
                </div>
                <p>{tag}</p>
                <div className="notes">
                  &copy; 2022 {name} Ltd. All Rights Reserved
                </div>
              </div>
              <div className="info">
                <h3>Contact</h3>
                <p>Email: spring@gmail.com</p>
                <p>Phone: {no}</p>
              </div>
              <div className="info">
                <h3>Address</h3>
                <p>{address}</p>
                <div className="social-links">
                  <a href={instagram}>
                    <InstagramIcon />
                  </a>
                  <a href={linkedIn}>
                    <LinkedInIcon />
                  </a>
                  <a href={twitter}>
                    <TwitterIcon />
                  </a>
                  <a href={facebook}>
                    <FacebookIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    school: state.school,
  }
}

export default connect(mapStateToProps, {
  getSchoolByTagFn,
  logout,
})(NewDashboard)
