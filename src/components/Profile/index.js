import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

class Profile extends Component {
  onClickLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('./login')
  }

  render() {
    const username = Cookies.get('username') || 'Unknown' // Default value if cookie is not set
    const password = Cookies.get('password') || '' // Default value if cookie is not set

    const maskedPassword = '*'.repeat(password.length) // Masked password with asterisks

    return (
      <div className="color">
        <Header />
        <div className="bg-color">
          <h1>Account</h1>
          <hr />
          <p className="textColor">Member ship</p>
          <p>Username:{username}</p>
          <p className="textColor">Password</p> <p>{maskedPassword}</p>
          <hr />
          <p>Plan details</p>
          <p>Premium</p>
          <p>Ultra HD</p>
        </div>
        <button type="button" onClick={this.onClickLogOut} className="btn">
          Logout
        </button>
      </div>
    )
  }
}

export default Profile
