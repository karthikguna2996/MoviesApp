import './index.css'

import Header from '../Header'

const RandomMovie = props => {
  const {movieDetails} = props
  const {backdropPath, title, overview} = movieDetails
  return (
    <div
      style={{
        height: '605px',
        gap: '0px',
        opacity: '0px',
        backgroundImage: `url(${backdropPath})`,
        backgroundSize: 'cover',
        width: '100vw',
        color: 'white',
      }}
    >
      <Header />
      <div className="displayRand">
        <h2>{title}</h2>
        <p>{overview}</p>
        <button type="button">play</button>
      </div>
    </div>
  )
}

export default RandomMovie
