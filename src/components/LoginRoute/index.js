import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'
import MovieContext from '../../Context'
import './index.css'

const LoginRoute = () => (
  <MovieContext.Consumer>
    {value => {
      const {
        username,
        password,
        err,
        onClickUserName,
        onClickPassword,
        onClickLoginForm,
      } = value

      const onClickUserDetails = event => {
        onClickUserName(event.target.value)
      }

      const onClickPasswordDetails = event => {
        onClickPassword(event.target.value)
      }

      const onClickLoginDetails = event => {
        onClickLoginForm(event)
      }
      const jwtToken = Cookies.get('jwt_token')

      if (jwtToken !== undefined) {
        return <Redirect to="/" />
      }
      return (
        <div className="mainCont">
          <img
            src="https://res.cloudinary.com/dr4t2w75n/image/upload/fl_preserve_transparency/v1717754517/Group_7399_cjpio6.jpg?_s=public-apps"
            className="moviesImg"
            alt="login website logo"
          />
          <form className="formCont">
            <h1 className="h1cl">Login</h1>
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={onClickUserDetails}
              placeholder="Username"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={onClickPasswordDetails}
              placeholder="Password"
              id="password"
            />
            {err ? (
              <p className="errMsg">username or password invalid</p>
            ) : null}
            <button
              type="submit"
              onClick={onClickLoginDetails}
              className="buttonn"
            >
              Login
            </button>
          </form>
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default withRouter(LoginRoute)
