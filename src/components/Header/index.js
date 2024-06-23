import {Link} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'

import MovieContext from '../../Context'

import './index.css'

const Header = () => (
  <MovieContext.Consumer>
    {value => {
      const {searchInput, onChangeInput, onClickSearch, isInputVisible} = value
      const onChangeMovie = event => {
        onChangeInput(event.target.value)
      }

      const onClickSearchMovies = () => {
        onClickSearch()
      }

      return (
        <ul className="headerDisplay">
          <Link to="/" className="text">
            <li> Home</li>
          </Link>

          <Link to="/popular" className="text">
            <li>Popular</li>
          </Link>

          <div className="inputProfile">
            <Link to="/search" className="text">
              <button type="button" onClick={onClickSearchMovies}>
                <FaSearch className="search" />
              </button>
              {isInputVisible ? (
                <input
                  onChange={onChangeMovie}
                  value={searchInput}
                  type="search"
                />
              ) : null}
            </Link>

            <Link to="/account" className="text">
              <li>
                <img
                  src="https://res.cloudinary.com/dr4t2w75n/image/upload/fl_preserve_transparency/v1718282820/Group_esdzqf.jpg?_s=public-apps"
                  className="profileProps"
                  alt="profile"
                />
              </li>
            </Link>
          </div>
        </ul>
      )
    }}
  </MovieContext.Consumer>
)
export default Header
