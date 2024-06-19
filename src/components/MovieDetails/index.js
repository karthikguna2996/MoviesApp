import {Component} from 'react'

import Cookies from 'js-cookie'

import {getYear, format} from 'date-fns'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieInf: {},
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        style={{margin: 'auto'}}
      />
    </div>
  )

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )

    if (response.ok === true) {
      const MoveDet = await response.json()
      const data = MoveDet.movie_details
      console.log(data)
      const MovieInfo = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        budget: data.budget,
        genres: data.genres,
        id: data.id,
        overview: data.overview,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        runtime: data.runtime,
        similarMovies: data.similar_movies,
        spokenLanguages: data.spoken_languages,
        title: data.title,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieInf: {...MovieInfo},
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderView = () => {
    const {movieInf} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,

      overview,

      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieInf

    const similarMoviesCC = similarMovies.map(eachItem => ({
      backdropPath: eachItem.backdrop_path,
      id: eachItem.id,
      overview: eachItem.overview,
      posterPath: eachItem.poster_path,
      title: eachItem.title,
    }))

    return (
      <>
        <div
          style={{
            height: '410px',
            gap: '0px',
            opacity: '0px',
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
            width: '100vw',
          }}
        >
          <Header />
          <div>
            <h1 className="title">{title}</h1>
            <div className="infoCont">
              <p className="runTime">
                {Math.floor(runtime / 60)}h {runtime % 60}m
              </p>
              <p>
                {adult ? (
                  <span className="isAdult">A</span>
                ) : (
                  <span className="isAdult">U/A</span>
                )}
              </p>
              <p className="date">{getYear(new Date(releaseDate))}</p>
            </div>
            <p className="overview ">{overview}</p>
            <button type="button" className="play">
              Play
            </button>
          </div>
        </div>
        <div className="flexing">
          <div>
            <p className="genresHeading">Genres</p>
            <ul>
              {genres.map(eachItem => (
                <li key={eachItem.id}>{eachItem.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="genresHeading">Audio Available</p>
            <ul>
              {spokenLanguages.map(eachItem => (
                <li key={eachItem.id}>{eachItem.english_name}</li>
              ))}
            </ul>
          </div>

          <div>
            <div>
              <p className="genresHeading">Rating Count</p>
              <p className="color">{voteCount}</p>
            </div>
            <div>
              <p className="genresHeading">Rating Average</p>
              <p className="color">{voteAverage}</p>
            </div>
          </div>

          <div>
            <div>
              <p className="genresHeading">Budget</p>
              <p className="color">{budget}</p>
            </div>

            <div>
              <p className="genresHeading">Release Date</p>
              <p className="color">
                {`${format(new Date(releaseDate), `dd `)}th ${format(
                  new Date(releaseDate),
                  'MMMM yyyy',
                )}`}
              </p>
            </div>
          </div>
        </div>
        <p className="color">More Like This</p>
        <ul className="commponentWrap">
          {similarMoviesCC.map(eachItem => (
            <MovieItem moviesDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    let a
    switch (apiStatus) {
      case apiStatusConstants.success:
        a = this.renderView()
        break
      case apiStatusConstants.inProgress:
        a = this.renderLoader()
        break
      default:
        a = null
    }

    return (
      <>
        <div className="bgc">{a}</div>
      </>
    )
  }
}

export default MovieDetails
