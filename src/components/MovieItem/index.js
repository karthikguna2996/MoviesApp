import './index.css'

const MovieItem = props => {
  const {moviesDetails} = props
  const {posterPath, title} = moviesDetails
  return (
    <li className="movieCard">
      <img src={posterPath} alt={title} className="movieCard" />
    </li>
  )
}

export default MovieItem
