import {Link} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'

import './index.css'

const Header = () => (
  <div className="headerDisplay">
    <Link to="/" className="text">
      Home
    </Link>
    <Link to="/popular" className="text">
      Popular
    </Link>
    <div className="inputProfile">
      <Link to="/search" className="text">
        <FaSearch className="search" />
        <input />
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

export default Header
