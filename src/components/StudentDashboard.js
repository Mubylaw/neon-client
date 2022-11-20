import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { connect } from 'react-redux'
import { updateUser } from '../store/actions/users'

class StudentDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student: 'hom',
      feeAdd: [],
      view: false,
      cardname: '',
      cardnumber: '',
      seccode: '',
      exdate: '',
      zipcode: '',
    }
  }

  addFee = (e) => {
    var { feeAdd } = this.state
    if (e.target.checked) {
      feeAdd.push({
        name: e.target.name.split('_')[0],
        value: e.target.name.split('_')[1],
      })
      this.setState({ feeAdd })
    } else {
      const index = feeAdd.findIndex(
        (e) => e.name === e.target.name.split('_')[0]
      )
      feeAdd.splice(index, 1)
      this.setState({ feeAdd })
    }
  }

  submitFee = (e) => {
    const { feeAdd } = this.state
    if (feeAdd.length > 0) {
      this.setState({
        view: true,
      })
      this.props.updateUser({ fee: feeAdd }).then(() => {
        this.setState({
          view: false,
          student: 'hom',
        })
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  pay = (e) => {
    window.open(
      `https://checkout.seerbitapi.com/?mid=SBPUBK_JI2KPQ9RB52NIVFKGFGOX2BETX3HDTAB&paymentReference=b5e235ee-6d5f-426c-b594-943daf711182`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  render() {
    const { student, feeAdd, cardname, cardnumber, seccode, exdate, zipcode } =
      this.state
    const { currentUser, fee } = this.props

    console.log(currentUser)
    var date = new Date()
    date = date.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    var total = 0
    if (feeAdd.length > 0) {
      feeAdd.forEach((feeAdd) => {
        total += parseInt(feeAdd.value)
      })
    }

    return (
      <div className="student-dash">
        <div className="header">
          <div className="logo">
            <img src="https://i.imgur.com/QI75xJ8.png" alt="Neon" />
          </div>
          <div className="nav-link">
            <div
              className="nav-item"
              onClick={() => this.setState({ student: 'hom' })}
            >
              Home
            </div>
            <div
              className="nav-item"
              onClick={() => this.setState({ student: 'plan' })}
            >
              Payment Plan
            </div>
            <div
              className="nav-item"
              onClick={() => this.setState({ student: 'meth' })}
            >
              Payment Method
            </div>
            <div className="nav-item" onClick={this.logout}>
              Log out
            </div>
          </div>
        </div>
        <div className="student-info">
          <div className="up">Hello, {currentUser.user.firstName}</div>
          <div className="down">{date}</div>
        </div>
        <hr />
        <div className={`home ${student === 'hom' ? '' : 'hide'}`}>
          <div className="pay-block">
            <div className="pay-status">
              <div className="info">
                Payment Status:{' '}
                {currentUser.user.schoolPayment ? (
                  <span>Paid</span>
                ) : (
                  <span className="err">Not Paid</span>
                )}
              </div>
              <div className="sub-info">Next Payment Due in 27 Days</div>
              <div className="now">
                <div className="btn" onClick={this.pay}>
                  Pay Now
                </div>
              </div>
            </div>
            <div className="pay-history">
              <div className="amount">
                {currentUser.user.schoolPayment ? (
                  <>{parseInt(currentUser.user.schoolPayment.term * 3)}</>
                ) : (
                  0
                )}
              </div>
              <div className="sub-info">Total payments made</div>
            </div>
          </div>
          <div className="pay-header">
            <div className="up">Payment Plan</div>
            <div
              className="down"
              onClick={() => this.setState({ student: 'plan' })}
            >
              edit
            </div>
          </div>
          <div className="pay-show">
            <div className="info">
              <div className="header">
                <div className="item">Name of item</div>
                <div className="price">Price</div>
              </div>
              {currentUser.user.fee.length > 0 ? (
                currentUser.user.fee.map((e, i) => (
                  <div className="fee-list" key={i}>
                    <div className="name">{e.name}</div>
                    <div className="price">{e.value}</div>
                  </div>
                ))
              ) : (
                <div className="fee-list">
                  <div>The fees you add would show here</div>
                </div>
              )}
              <div className="session">Session: 2021/2022</div>
            </div>
            <div className="exps">
              <p>Current term started: 13-09-22</p>
              <p>Current term ends: 18-12-22</p>
              <p>Next term starts: 13-01-23</p>
            </div>
          </div>
          <div className="auto-pay">
            <div className="title">
              Auto Pay <span>(Recurring payments)</span>
            </div>
            <div class="form-check form-switch">
              <label className="form-check-label" htmlFor="fullDebit">
                Automatically debit full fees at start of every term ?
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                name="fullDebit"
                id="fullDebit"
              />
            </div>
            <div class="form-check form-switch">
              <label className="form-check-label" htmlFor="sub">
                Split fee into monthly installments and debit monthly ?
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                name="sub"
                id="sub"
              />
            </div>
          </div>
        </div>
        <div className={`pay-plan ${student === 'plan' ? '' : 'hide'}`}>
          <div className="header">
            <div className="item">Name of item</div>
            <div className="price">Price</div>
          </div>
          <div className="item-load">
            {fee.map((e, i) => (
              <div className="fee-list" key={i}>
                <div className="choose">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={`${e.name}_${e.value}`}
                    id="fee"
                    onClick={this.addFee}
                  />
                </div>
                <div className="name">{e.name}</div>
                <div className="price">{e.value}</div>
              </div>
            ))}

            <div className="fee-list total">
              <div className="name">Total</div>
              <div className="price">{total}</div>
            </div>
            <div className="submit-links">
              <div
                className={`next ${this.state.view ? 'btn-load' : ''}`}
                onClick={this.submitFee}
              >
                <span className="btn_text">Save</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`pay-method ${student === 'meth' ? '' : 'hide'}`}>
          <div className="img">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="cardname" className="form-label">
                Name on Card
              </label>
              <input
                type="text"
                className="form-control"
                id="cardname"
                onChange={this.handleChange}
                value={cardname}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardnumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardnumber"
                onChange={this.handleChange}
                value={cardnumber}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="exdate" className="form-label">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exdate"
                  onChange={this.handleChange}
                  value={exdate}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="seccode" className="form-label">
                  Security Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="seccode"
                  onChange={this.handleChange}
                  value={seccode}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="zipcode" className="form-label">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                onChange={this.handleChange}
                value={zipcode}
              />
            </div>

            <div className="submit-links">
              <div
                className="submit"
                onClick={() => {
                  this.setState({
                    student: 'hom',
                  })
                }}
              >
                <LockOutlinedIcon /> Add payment method
              </div>
            </div>
          </form>
        </div>
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
  updateUser,
})(StudentDashboard)
