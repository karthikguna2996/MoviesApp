import Cookies from 'js-cookie'

import Header from '../Header'

import MovieContext from '../../Context'

import './index.css'

const Profile = props => (
  <MovieContext.Consumer>
    {value => {
      const {username, password} = value
      const onClickLogOut = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('./login')
      }
      const maskedPassword = '*'.repeat(password.length)
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
          <button type="button" onClick={onClickLogOut} className="btn">
            Logout
          </button>
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default Profile
