import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    err: false,
  }

  onClickUserName = event => {
    this.setState({username: event.target.value})
  }

  onClickPassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLoginForm = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({err: true})
    }
  }

  render() {
    const {username, password, err} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="mainCont">
        <img
          src="https://res.cloudinary.com/dr4t2w75n/image/upload/fl_preserve_transparency/v1717754517/Group_7399_cjpio6.jpg?_s=public-apps"
          className="moviesImg"
          alt="Movies"
        />
        <form className="formCont">
          <h1 className="h1cl">Login</h1>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={this.onClickUserName}
            placeholder="Username"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={this.onClickPassword}
            placeholder="Password"
            id="password"
          />
          {err ? <p className="errMsg">username or password invalid</p> : null}
          <button
            type="submit"
            onClick={this.onClickLoginForm}
            className="buttonn"
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginRoute)
