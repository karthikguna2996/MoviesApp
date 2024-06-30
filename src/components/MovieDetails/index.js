import {Component} from 'react'

import Cookies from 'js-cookie'

import {getYear, format} from 'date-fns'

import Loader from 'react-loader-spinner'

import Icons from '../Icons'

import Header from '../Header'

import MovieDetailsFailureView from '../MovieDetailsFailureView'

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

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const {id} = params

    // Check if the ID in the URL has changed
    if (id !== prevProps.match.params.id) {
      // If the ID has changed, make a new fetch call
      this.getMovieDetails()
    }
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

  onClickTryAgainMovieDetail = () => {
    this.getMovieDetails()
  }

  renderFailure = () => (
    <MovieDetailsFailureView
      onClickTryAgainMovieDetail={this.onClickTryAgainMovieDetail}
    />
  )

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
              <>
                {adult ? (
                  <p className="isAdult">A</p>
                ) : (
                  <p className="isAdult">U/A</p>
                )}
              </>
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
            <h1 className="genresHeading">genres</h1>
            <ul>
              {genres.map(eachItem => (
                <li key={eachItem.id}>{eachItem.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="genresHeading">Audio Available</h1>
            <ul>
              {spokenLanguages.map(eachItem => (
                <p className="color" key={eachItem.id}>
                  {eachItem.english_name}
                </p>
              ))}
            </ul>
          </div>

          <div>
            <div>
              <h1 className="genresHeading">Rating Count</h1>
              <p className="color">{voteCount}</p>
            </div>
            <div>
              <h1 className="genresHeading">Rating Average</h1>
              <p className="color">{voteAverage}</p>
            </div>
          </div>

          <div>
            <div>
              <h1 className="genresHeading">Budget</h1>
              <p className="color">{budget}</p>
            </div>

            <div>
              <h1 className="genresHeading">Release Date</h1>
              <p className="color">
                {`${format(new Date(releaseDate), `dd `)}th ${format(
                  new Date(releaseDate),
                  'MMMM yyyy',
                )}`}
              </p>
            </div>
          </div>
        </div>
        <h1 className="color">More Like This</h1>
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
      case apiStatusConstants.failure:
        a = this.renderFailure()
        break
      default:
        a = null
    }

    return (
      <>
        <div className="bgc">{a}</div>
        <div>
          <Icons />
        </div>
      </>
    )
  }
}

export default MovieDetails
