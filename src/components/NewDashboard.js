import React, { Component } from 'react'
import { getUser } from '../store/actions/users'
import {
  getSchoolFn,
  addSchoolFn,
  updateSchoolFn,
  uploadStudents,
} from '../store/actions/school'
import { logout } from '../store/actions/auth'
import { connect } from 'react-redux'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import StudentDashboard from './StudentDashboard'

class NewDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onboard: true,
      role: '',
      onboardStep: 'hom',
      bio: '',
      tag: '',
      twitter: '',
      header: '',
      linkedIn: '',
      no: '',
      address: '',
      facebook: '',
      instagram: '',
      name: '',
      color: '#563d7c',
      fromHome: false,
      err: '',
      view: false,
      id: '6377fd4fd75fad0324381178',
      feeName: '',
      price: '',
      feeCompulsory: true,
      fee: [],
      installment: false,
      data: false,
      csv: false,
      session: '',
      firstStartDate: '',
      firstEndDate: '',
      secondStartDate: '',
      secondEndDate: '',
      thirdStartDate: '',
      thirdEndDate: '',
      success: '',
      val: [],
      val: [],
      search: '',
      action: 'hom',
      students: [],
      filter: '',
      filterArr: [],
      count: 1,
      viewPrev: false,
      donePrev: false,
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.currentUser.user.id, 'user').then(() => {
      const { user } = this.props.currentUser
      if (!user.school && user.role !== 'student') {
        this.setState({
          role: 'school',
          onboard: false,
        })
      } else if (user.role === 'student') {
        this.setState({
          role: 'student',
        })
        this.props.getSchoolFn(user.school).then(() => {
          var { fee } = this.props.school

          this.setState({
            fee,
          })
        })
      } else {
        this.setState({
          onboard: true,
          role: 'school',
        })
        this.props.getSchoolFn(user.school).then(() => {
          var {
            bio,
            tag,
            twitter,
            header,
            name,
            linkedIn,
            no,
            address,
            facebook,
            instagram,
            color,
            fee,
            customFields,
            _id,
            students,
          } = this.props.school

          this.setState({
            tag,
            twitter,
            header,
            name,
            linkedIn,
            no,
            address,
            facebook,
            instagram,
            color,
            bio,
            fee,
            val: [
              'firstName',
              'lastName',
              'email',
              'Payment Status',
              ...customFields,
            ],
            id: _id,
            students,
            count: students.length,
          })
        })
      }
    })
  }

  logout = (e) => {
    e.preventDefault()
    this.props.logout()
    this.props.history.push('/signin')
  }

  handleForm = (e) => {
    e.preventDefault()
    const {
      firstStartDate,
      firstEndDate,
      secondStartDate,
      secondEndDate,
      thirdStartDate,
      thirdEndDate,
      session,
      fee,
    } = this.state

    if (
      !firstStartDate ||
      !firstEndDate ||
      !secondStartDate ||
      !secondEndDate ||
      !thirdStartDate ||
      !thirdEndDate ||
      !session
    ) {
      this.setState({
        err: 'Please add all term dates',
      })
    } else {
      var term = [
        { no: 1, startDate: firstStartDate, endDate: firstEndDate },
        { no: 2, startDate: secondStartDate, endDate: secondEndDate },
        { no: 3, startDate: thirdStartDate, endDate: thirdEndDate },
      ]
      if (!fee) {
        this.setState({
          onboardStep: 'plan',
          err: 'Please add school fees',
        })
      } else {
        var newFee = fee.map((e) => {
          return { ...e, session: { name: session, term } }
        })
        this.setState({
          view: true,
        })
        this.props
          .updateSchoolFn({ fee: newFee }, this.state.id)
          .then(() => {
            console.log(this.props.school)
            this.setState({
              view: false,
              onboard: true,
            })
          })
          .catch(() => {
            this.setState({
              view: false,
            })
          })
      }
    }
  }

  handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked,
        err: '',
      })
    } else if (e.target.files) {
      var formData = new FormData()
      formData.append('avatar', e.target.files[0])
      this.setState({
        data: formData,
        err: '',
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        err: '',
      })
    }
  }

  schoolDetails = (e) => {
    var {
      bio,
      tag,
      twitter,
      header,
      name,
      linkedIn,
      no,
      address,
      facebook,
      instagram,
      color,
      data,
      donePrev,
    } = this.state
    if (donePrev) {
      this.setState({
        onboardStep: 'plan',
      })
    } else {
      if (!data) {
        data = new FormData()
      }
      data.append('bio', bio)
      data.append('tag', tag)
      data.append('twitter', twitter)
      data.append('header', header)
      data.append('name', name)
      data.append('linkedIn', linkedIn)
      data.append('no', no)
      data.append('address', address)
      data.append('facebook', facebook)
      data.append('instagram', instagram)
      data.append('color', color)
      if (this.state.fromHome) {
        this.setState({
          view: true,
        })
        this.props
          .updateSchoolFn(data, this.state.id)
          .then(() => {
            console.log(this.props.school)
            this.setState({
              view: false,
              onboard: true,
            })
          })
          .catch(() => {
            this.setState({
              view: false,
            })
          })
      } else {
        if (!name) {
          this.setState({
            err: 'Please add a school name',
          })
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        } else {
          this.setState({
            view: true,
          })
          this.props
            .addSchoolFn(data)
            .then(() => {
              this.setState({
                view: false,
                onboardStep: 'plan',
                id: this.props.school._id,
              })
            })
            .catch(() => {
              this.setState({
                view: false,
              })
            })
        }
      }
    }
  }

  addFee = (e) => {
    var { fee } = this.state
    const { feeName, price, feeCompulsory } = this.state
    if (!this.state.feeName) {
      this.setState({
        err: 'Please add a name for this fee item',
      })
    } else if (!this.state.price) {
      this.setState({
        err: 'Please add a price for this fee item',
      })
    } else {
      if (fee.findIndex((e) => e.name === feeName) > -1) {
        this.setState({
          err: 'This fee already exists',
        })
      } else {
        fee.push({
          name: feeName,
          value: price,
          compulsory: feeCompulsory,
        })
        this.setState({
          feeName: '',
          price: '',
        })
      }
    }
  }

  uploadCSV = (e) => {
    if (this.state.csv) {
      this.setState({
        view: true,
      })
      this.props
        .uploadStudents(this.state.id, this.state.csv, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          this.setState({ onboardStep: 'session', view: false })
        })
        .catch(() => {
          this.setState({
            view: false,
          })
        })
    } else {
      this.setState({
        err: 'Upload a csv file',
      })
    }
  }

  addCSV = (e) => {
    if (e.target.files) {
      var formData = new FormData()
      formData.append('students', e.target.files[0])
      this.setState({
        csv: formData,
      })
    }
  }

  handleRemove = (i) => {
    var { fee } = this.state
    fee.splice(i, 1)
    this.setState({ fee })
  }

  handleSuccess = () => {
    this.setState({
      success: 'CSV would be sent to the email of this school',
    })
    setTimeout(() => {
      this.setState({
        success: '',
      })
    }, 5000)
  }

  handleFilter = () => {
    var { filterArr } = this.state
    if (this.state.action === 'hom') {
      this.setState({
        action: 'search',
      })
    } else if (this.state.action === 'filter') {
      if (!this.state.filter || !this.state.search) {
        this.setState({
          err: 'Add filter parameters',
        })
      } else if (
        filterArr.findIndex((e) => e.filter === this.state.filter) > -1
      ) {
        this.setState({
          err: 'This filter already exists',
        })
      } else {
        filterArr.push({
          filter: this.state.filter,
          search: this.state.search,
        })
        this.setState({
          filter: '',
          search: '',
          filterArr,
        })
        console.log(filterArr)
      }
    }
  }

  handleFilterRemove = (i) => {
    var { filterArr } = this.state
    filterArr.splice(i, 1)
    this.setState({ filterArr })
  }

  handlePreview = (e) => {
    var {
      bio,
      tag,
      twitter,
      header,
      name,
      linkedIn,
      no,
      address,
      facebook,
      instagram,
      color,
      data,
    } = this.state
    if (!data) {
      data = new FormData()
    }
    data.append('bio', bio)
    data.append('tag', tag)
    data.append('twitter', twitter)
    data.append('header', header)
    data.append('name', name)
    data.append('linkedIn', linkedIn)
    data.append('no', no)
    data.append('address', address)
    data.append('facebook', facebook)
    data.append('instagram', instagram)
    data.append('color', color)
    if (this.state.fromHome) {
      this.setState({
        viewPrev: true,
      })
      this.props
        .updateSchoolFn(data, this.state.id)
        .then(() => {
          this.setState({
            viewPrev: false,
            donePrev: true,
          })
          window.open(
            `https://neon-client.onrender.com/${this.props.school.slug}`,
            '_blank',
            'noopener,noreferrer'
          )
        })
        .catch(() => {
          this.setState({
            viewPrev: false,
          })
        })
    } else {
      if (!name) {
        this.setState({
          err: 'Please add a school name',
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        this.setState({
          viewPrev: true,
        })
        this.props
          .addSchoolFn(data)
          .then(() => {
            this.setState({
              viewPrev: false,
              id: this.props.school._id,
            })
            window.open(
              `https://neon-client.onrender.com/${this.props.school.slug}`,
              '_blank',
              'noopener,noreferrer'
            )
          })
          .catch(() => {
            this.setState({
              viewPrev: false,
            })
          })
      }
    }
  }

  render() {
    const { errors } = this.props
    var {
      onboard,
      role,
      onboardStep,
      bio,
      tag,
      twitter,
      header,
      name,
      linkedIn,
      no,
      address,
      facebook,
      instagram,
      color,
      err,
      feeName,
      price,
      feeCompulsory,
      fee,
      installment,
      session,
      firstStartDate,
      firstEndDate,
      secondStartDate,
      secondEndDate,
      thirdStartDate,
      thirdEndDate,
      fromHome,
      success,
      val,
      search,
      students,
      action,
      filter,
      filterArr,
      count,
      viewPrev,
    } = this.state
    var date = new Date()
    date = date.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    var total = 0
    var newVal = [...val, 'Defaulters']
    if (fee.length > 0) {
      fee.forEach((fee) => {
        total += parseInt(fee.value)
        newVal = [...newVal, fee.name]
      })
    }
    if (search && action === 'search') {
      students = students.filter((e) => {
        if (e.firstName.includes(search)) {
          return true
        } else if (e.lastName.includes(search)) {
          return true
        } else {
          return false
        }
      })
    }
    if (students.length > 0) {
      students = students.filter((e) => {
        if (e.role !== 'student') {
          return false
        } else {
          return true
        }
      })
    }
    if (filterArr.length > 0) {
      filterArr.forEach((filter) => {
        console.log(filter)
        var name = filter.filter
        var value = filter.search
        students = students.filter((e) => {
          if (name === 'Payment Status' && e.schoolPayment) {
            return true
          } else if (name === 'Defaulters' && !e.schoolPayment) {
            return true
          } else if (fee.findIndex((el) => el.name === name) > -1) {
            if (e.schoolPayment) {
              if (
                e.schoolPayment.fee.findIndex((ele) => ele.name === name) > -1
              ) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          } else {
            if (e[name]) {
              if (e[name].includes(value)) {
                return true
              }
            } else if (e.customValues[name]) {
              if (e.customValues[name].includes(value)) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        })
      })
    }

    console.log(filterArr)

    return (
      <div className="dash-hero">
        {role === 'student' ? (
          <StudentDashboard currentUser={this.props.currentUser} fee={fee} />
        ) : !onboard ? (
          <div className="onboard">
            <div className="header">
              <div className="logo">
                <img src="https://i.imgur.com/QI75xJ8.png" alt="Neon" />
                <span>Neon</span>
              </div>
              <div className="nav-steps">
                {fromHome && (
                  <>
                    <div
                      className="deets"
                      onClick={() => this.setState({ onboard: true })}
                    >
                      <div
                        className={`icon ${
                          onboardStep === 'hom' ? 'full' : ''
                        }`}
                      ></div>
                      <div className="btn-text">Home</div>
                    </div>
                    <div className="arrow">
                      <ChevronRightOutlinedIcon />
                    </div>
                  </>
                )}
                <div
                  className="deets"
                  onClick={() => this.setState({ onboardStep: 'hom' })}
                >
                  <div
                    className={`icon ${onboardStep === 'hom' ? 'full' : ''}`}
                  ></div>
                  <div className="btn-text">Upload Details</div>
                </div>
                <div className="arrow">
                  <ChevronRightOutlinedIcon />
                </div>
                <div
                  className="deets"
                  onClick={() => this.setState({ onboardStep: 'plan' })}
                >
                  <div
                    className={`icon ${onboardStep === 'plan' ? 'full' : ''}`}
                  ></div>
                  <div className="btn-text">Payment Plan</div>
                </div>
                <div className="arrow">
                  <ChevronRightOutlinedIcon />
                </div>
                <div
                  className="deets"
                  onClick={() => this.setState({ onboardStep: 'student' })}
                >
                  <div
                    className={`icon ${
                      onboardStep === 'student' ? 'full' : ''
                    }`}
                  ></div>
                  <div className="btn-text">Student List</div>
                </div>
                <div className="arrow">
                  <ChevronRightOutlinedIcon />
                </div>
                <div
                  className="deets"
                  onClick={() => this.setState({ onboardStep: 'session' })}
                >
                  <div
                    className={`icon ${
                      onboardStep === 'session' ? 'full' : ''
                    }`}
                  ></div>
                  <div className="btn-text">Session</div>
                </div>
              </div>
            </div>
            <div className="title">Your school's details</div>
            <hr />
            <div className={`details ${onboardStep === 'hom' ? '' : 'hide'}`}>
              {!errors.message ? (
                ''
              ) : (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              {!err ? '' : <div className="alert alert-danger">{err}</div>}
              <div className="form-container-neon">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name of school
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={this.handleChange}
                      value={name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      name="bio"
                      onChange={this.handleChange}
                      value={bio}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="pritag" className="form-label">
                          Primary tag line
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="pritag"
                          name="header"
                          onChange={this.handleChange}
                          value={header}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="sectag" className="form-label">
                          Secondary tag line
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="sectag"
                          name="tag"
                          onChange={this.handleChange}
                          value={tag}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="logo" className="form-label">
                        Add your logo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="logo"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="number" className="form-label">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          name="no"
                          onChange={this.handleChange}
                          value={no}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="exampleColorInput" className="form-label">
                        Color picker
                      </label>
                      <input
                        type="color"
                        className="form-control form-control-color"
                        id="exampleColorInput"
                        title="Choose your color"
                        name="color"
                        onChange={this.handleChange}
                        value={color}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows="3"
                      name="address"
                      onChange={this.handleChange}
                      value={address}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="insta" className="form-label">
                          Instagram
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="insta"
                          name="instagram"
                          onChange={this.handleChange}
                          value={instagram}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="facebook" className="form-label">
                          Facebook
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="facebook"
                          name="facebook"
                          onChange={this.handleChange}
                          value={facebook}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="linkedin" className="form-label">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="linkedin"
                          name="linkedIn"
                          onChange={this.handleChange}
                          value={linkedIn}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="twitter" className="form-label">
                          Twitter
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="twitter"
                          name="twitter"
                          onChange={this.handleChange}
                          value={twitter}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="submit-links">
                    <div
                      className={`back ${viewPrev ? 'btn-load' : ''}`}
                      onClick={this.handlePreview}
                    >
                      <span className="btn_text">Preview</span>
                    </div>
                    <div
                      className={`next ${this.state.view ? 'btn-load' : ''}`}
                      onClick={this.schoolDetails}
                    >
                      <span className="btn_text">Continue</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={`payment ${onboardStep === 'plan' ? '' : 'hide'}`}>
              <div className="form-add">
                {!errors.message ? (
                  ''
                ) : (
                  <div className="alert alert-danger">{errors.message}</div>
                )}
                {!err ? '' : <div className="alert alert-danger">{err}</div>}
                <form>
                  <div className="mb-3">
                    <label htmlFor="feeName" className="form-label">
                      Name of item
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="feeName"
                      placeholder="Ex: Tuition"
                      name="feeName"
                      onChange={this.handleChange}
                      value={feeName}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="Ex: Tuition"
                      name="price"
                      onChange={this.handleChange}
                      value={price}
                    />
                  </div>
                  <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="feeCompulsory">
                      Is this item compulsory?
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      name="feeCompulsory"
                      id="feeCompulsory"
                      onChange={this.handleChange}
                      value={feeCompulsory}
                    />
                  </div>
                  <div className="submit-links">
                    <div
                      className="back"
                      onClick={() => this.setState({ onboardStep: 'hom' })}
                    >
                      Back
                    </div>
                    <div className="next" onClick={this.addFee}>
                      Add item
                    </div>
                  </div>
                </form>
              </div>
              <div className="fee-view">
                <div className="header">
                  <div className="item">Name of item</div>
                  <div className="price">Price</div>
                </div>
                <div className="item-load">
                  {fee.map((e, i) => (
                    <div className="fee-list" key={i}>
                      <div
                        className="delete"
                        onClick={this.handleRemove.bind(this, i)}
                      >
                        <DeleteOutlinedIcon />
                      </div>
                      <div className="name">{e.name}</div>
                      <div className="price">{e.value}</div>
                    </div>
                  ))}
                  <div className="fee-list total">
                    <div className="name">Total</div>
                    <div className="price">{total}</div>
                  </div>
                  <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="installment">
                      Allow recurring payments?
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      name="installment"
                      id="installment"
                      onChange={this.handleChange}
                      value={installment}
                    />
                  </div>
                  <div className="submit-links">
                    <div
                      className="next"
                      onClick={() => this.setState({ onboardStep: 'student' })}
                    >
                      Continue
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`students ${onboardStep === 'student' ? '' : 'hide'}`}
            >
              {!errors.message ? (
                ''
              ) : (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              {!err ? '' : <div className="alert alert-danger">{err}</div>}
              <form>
                <label htmlFor="students" className="form-label">
                  Upload students CSV
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="students"
                  onChange={this.addCSV}
                  aria-describedby="csvHelp"
                />
                <div id="csvHelp" className="form-text">
                  Import your students list from a csv, ensure the list has at
                  least firstName, lastName and email in seperate columns
                </div>
                <div className="submit-links">
                  <div
                    className="back"
                    onClick={() => this.setState({ onboardStep: 'plan' })}
                  >
                    Back
                  </div>
                  <div
                    className={`next ${this.state.view ? 'btn-load' : ''}`}
                    onClick={this.uploadCSV}
                  >
                    <span className="btn_text">Continue</span>
                  </div>
                </div>
              </form>
            </div>
            <div
              className={`session ${onboardStep === 'session' ? '' : 'hide'}`}
            >
              <form>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="session"
                  value={session ? session : 'Choose current session'}
                  onChange={this.handleChange}
                >
                  <option value="1">2021/2022</option>
                  <option value="2">2022/2023</option>
                </select>
                <div className="session-date">
                  <div className="term">
                    <div className="title">1st Term</div>
                    <label htmlFor="firstStartDate">Start Date</label>
                    <input
                      id="firstStartDate"
                      className="form-control"
                      type="date"
                      name="firstStartDate"
                      value={firstStartDate}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="firstEndDate">End Date</label>
                    <input
                      id="firstEndDate"
                      className="form-control"
                      type="date"
                      name="firstEndDate"
                      value={firstEndDate}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="term">
                    <div className="title">2nd Term</div>
                    <label htmlFor="secondStartDate">Start Date</label>
                    <input
                      id="secondStartDate"
                      className="form-control"
                      type="date"
                      name="secondStartDate"
                      value={secondStartDate}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="secondEndDate">End Date</label>
                    <input
                      id="secondEndDate"
                      className="form-control"
                      type="date"
                      name="secondEndDate"
                      value={secondEndDate}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="term">
                    <div className="title">3rd Term</div>
                    <label htmlFor="thirdStartDate">Start Date</label>
                    <input
                      id="thirdStartDate"
                      className="form-control"
                      type="date"
                      name="thirdStartDate"
                      value={thirdStartDate}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="thirdEndDate">End Date</label>
                    <input
                      id="thirdEndDate"
                      className="form-control"
                      type="date"
                      name="thirdEndDate"
                      value={thirdEndDate}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-check form-switch">
                  <label className="form-check-label" htmlFor="sameDate">
                    Automatically create sessions with the same term dates in
                    the future?
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    name="sameDate"
                    id="sameDate"
                  />
                </div>
                <div className="submit-links">
                  <div
                    className="back"
                    onClick={() => this.setState({ onboardStep: 'student' })}
                  >
                    Back
                  </div>
                  <button
                    type="submit"
                    className={`btn ${this.state.view ? 'btn-load' : ''}`}
                    onClick={this.handleForm}
                  >
                    <span className="btn_text">Finish</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="school-dash">
            <div className="header">
              <div className="logo">
                <img src="https://i.imgur.com/QI75xJ8.png" alt="Neon" />
              </div>
              <div className="nav-link">
                <div className="nav-item">Home</div>
                <div
                  className="nav-item"
                  onClick={() =>
                    this.setState({
                      onboardStep: 'hom',
                      fromHome: 'true',
                      onboard: false,
                    })
                  }
                >
                  Details
                </div>
                <div
                  className="nav-item"
                  onClick={() =>
                    this.setState({
                      onboardStep: 'plan',
                      fromHome: 'true',
                      onboard: false,
                    })
                  }
                >
                  Payment Plan
                </div>
                <div className="nav-item" onClick={this.logout}>
                  Log out
                </div>
              </div>
            </div>
            <div className="action-header">
              <div className="up">
                <div
                  className={`btn ${action !== 'hom' ? 'hide' : ''}`}
                  onClick={this.handleSuccess}
                >
                  Export view as CSV
                </div>
                <div
                  className={`btn ${action !== 'hom' ? 'hide' : ''}`}
                  onClick={() => {
                    this.setState({
                      action: 'filter',
                    })
                  }}
                >
                  Filter students
                </div>
                <div
                  className={`btn ${action !== 'hom' ? 'hide' : ''}`}
                  onClick={() =>
                    this.setState({
                      onboardStep: 'student',
                      fromHome: 'true',
                      onboard: false,
                    })
                  }
                >
                  Add/Remove students
                </div>
                <select
                  className={`form-select ${action === 'filter' ? '' : 'hide'}`}
                  aria-label="Default select example"
                  name="filter"
                  onChange={this.handleChange}
                  value={filter ? filter : 'Filter by'}
                >
                  {newVal.map((e, i) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className={`form-control ${action !== 'hom' ? '' : 'hide'}`}
                  name="search"
                  placeholder="sam"
                  onChange={this.handleChange}
                  value={search}
                ></input>
                <SearchOutlinedIcon onClick={this.handleFilter} />
                <DeleteOutlinedIcon
                  className={`delete ${action !== 'hom' ? '' : 'hide'}`}
                  onClick={() => {
                    this.setState({
                      action: 'hom',
                      search: '',
                    })
                  }}
                />
              </div>
              <div className="down">
                <div className="count">
                  <span>1 </span>-<span> {count}</span> of <span>{count}</span>
                </div>
                <div className="icon">
                  <ChevronRightOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="suc-head">
              {success && <div className="alert alert-success">{success}</div>}
              {!errors.message ? (
                ''
              ) : (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              {!err ? '' : <div className="alert alert-danger">{err}</div>}
            </div>
            <div className="filter-header">
              <div className="up">
                <div className="tag">
                  <span>class</span>="<span>Jss1</span>"
                </div>
                {filterArr.map((e, i) => (
                  <div className="tag" key={i}>
                    <span>{e.filter}</span>="<span>{e.search}</span>"
                    <div
                      className="delete"
                      onClick={this.handleFilterRemove.bind(this, i)}
                    >
                      <DeleteOutlinedIcon />
                    </div>
                  </div>
                ))}
              </div>
              <div className="down">
                <span>{students.length}</span> entries
              </div>
            </div>
            <div className="list-body">
              <div className="list-header">
                {val.map((e, i) => (
                  <div className="list-item" key={i}>
                    {e}
                  </div>
                ))}
              </div>
              {students ? (
                students.map((e, i) => (
                  <div className="list-student" key={i}>
                    {val.map((f, j) => (
                      <div className="list-item" key={j}>
                        {f === 'Payment Status'
                          ? e.fee
                            ? 'Paid'
                            : 'Defaulter'
                          : e[f]
                          ? e[f]
                          : e.customValues[f]
                          ? e.customValues[f]
                          : 'Undefined'}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="list-student">
                  <div className="">Students you upload would show up here</div>
                </div>
              )}
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
  getUser,
  getSchoolFn,
  addSchoolFn,
  updateSchoolFn,
  logout,
  uploadStudents,
  //   updateUser,
})(NewDashboard)
