import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import MovieItem from '../MovieItem'

import Header from '../Header'

import Icons from '../Icons'

import RenderFailureViewPopular from '../RenderFailureViewPopular'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularMovies: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      const topMovies = data.results
      const topRatedMovies = topMovies.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        popularMovies: [...topRatedMovies],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
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

  renderView = () => {
    const {popularMovies} = this.state

    return (
      <ul className="popularMovies">
        {popularMovies.map(eachItem => (
          <MovieItem moviesDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onClickTryAgainPopular = () => {
    this.getPopularMovies()
  }

  renderFailure = () => (
    <RenderFailureViewPopular
      onClickTryAgainPopular={this.onClickTryAgainPopular}
    />
  )

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
        <div className="bgcolor">
          <Header />
          {a}
          <Icons />
        </div>
      </>
    )
  }
}

export default Popular
