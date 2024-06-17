import './index.css'

import {Link} from 'react-router-dom'

const MovieItem = props => {
  const {moviesDetails} = props
  const {id, posterPath, title} = moviesDetails
  return (
    <Link to={`/movies/${id}`}>
      <li className="movieCard">
        <img src={posterPath} alt={title} className="movieCard" />
      </li>
    </Link>
  )
}

export default MovieItem
