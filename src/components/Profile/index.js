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
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    let len = password.length
    let s = ''
    while (len !== 0) {
      s += '*'
      len -= 1
    }

    return (
      <div className="color">
        <Header />
        <div className="bg-color">
          <h1>Account</h1>
          <hr />
          <p className="textColor">Member ship</p>
          <p>Username:{username}</p>
          <p className="textColor">Password</p> <p>{s}</p>
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
