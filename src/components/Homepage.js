import React, { Component } from 'react'
// import SchoolDashboard from './SchoolDashboard'
import NewDashboard from './NewDashboard'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (!this.props.currentUser.isAuthenticated) {
      this.props.history.push('/signin')
    }
  }

  render() {
    const { currentUser } = this.props
    return (
      <div>
        <NewDashboard currentUser={currentUser} {...this.props} />
      </div>
    )
  }
}

export default Homepage
