import {Link} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'

import MovieContext from '../../Context'

import './index.css'

const Header = () => (
  <MovieContext.Consumer>
    {value => {
      const {searchInput, onChangeInput} = value
      const onChangeMovie = event => {
        onChangeInput(event.target.value)
      }

      return (
        <div className="headerDisplay">
          <Link to="/" className="text">
            Home
          </Link>
          <Link to="/popular" className="text">
            Popular
          </Link>
          <div className="inputProfile">
            <Link to="/search" className="text">
              <button type="button">
                <FaSearch className="search" />
              </button>
              <input onChange={onChangeMovie} value={searchInput} />
            </Link>
            <Link to="/profile" className="text">
              <img
                src="https://res.cloudinary.com/dr4t2w75n/image/upload/fl_preserve_transparency/v1718282820/Group_esdzqf.jpg?_s=public-apps"
                className="profileProps"
                alt="profile"
              />
            </Link>
          </div>
        </div>
      )
    }}
  </MovieContext.Consumer>
)
export default Header
