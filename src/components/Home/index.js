import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import MovieItem from '../MovieItem'

import RandomMovie from '../RandomMovie'

import FailureMovieFetch from '../FailureMovieFetch'

import Icons from '../Icons'

import './index.css'

import 'slick-carousel/slick/slick.css'

import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  Type: true,
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    originalRatingMovies: [],
    topRatingMovies: [],
    apiStatusOriginal: apiStatusConstants.initial,
    apiStatusTrending: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.trendingNowMovies()
    this.originalNowMovies()
  }

  trendingNowMovies = async () => {
    this.setState({apiStatusTrending: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
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
        topRatingMovies: [...topRatedMovies],
        apiStatusTrending: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusTrending: apiStatusConstants.failure})
    }
  }

  originalNowMovies = async () => {
    this.setState({apiStatusOriginal: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )

    if (response.ok === true) {
      const data2 = await response.json()
      const originalMovies = data2.results
      console.log(originalMovies)
      const originalRatedMovies = originalMovies.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        originalRatingMovies: [...originalRatedMovies],
        apiStatusOriginal: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusOriginal: apiStatusConstants.failure})
    }
  }

  renderViewTrending = () => {
    const {topRatingMovies} = this.state
    return (
      <Slider {...settings}>
        {topRatingMovies.map(eachItem => (
          <MovieItem moviesDetails={eachItem} key={eachItem.id} />
        ))}
      </Slider>
    )
  }

  renderViewOriginal = () => {
    const {originalRatingMovies} = this.state
    return (
      <Slider {...settings}>
        {originalRatingMovies.map(eachItem => (
          <MovieItem moviesDetails={eachItem} key={eachItem.id} />
        ))}
      </Slider>
    )
  }

  onClickTryAgain = () => {
    this.trendingNowMovies()
    this.originalNowMovies()
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

  renderFailureView = () => (
    <FailureMovieFetch onClickTryAgain={this.onClickTryAgain} />
  )

  renderRandomView = () => {
    const {originalRatingMovies} = this.state
    console.log(originalRatingMovies)
    const ran = Math.floor(Math.random() * originalRatingMovies.length)
    const Item = originalRatingMovies[ran]
    console.log(ran)
    if (originalRatingMovies.length === 0) {
      return null
    }
    return (
      <>
        <RandomMovie movieDetails={Item} />
      </>
    )
  }

  render() {
    const {apiStatusOriginal, apiStatusTrending} = this.state
    let a
    let b
    let c
    switch (apiStatusOriginal) {
      case apiStatusConstants.success:
        a = this.renderViewOriginal()
        break
      case apiStatusConstants.failure:
        a = this.renderFailureView()
        break
      case apiStatusConstants.inProgress:
        a = this.renderLoader()
        break
      default:
        a = null
    }
    switch (apiStatusOriginal) {
      case apiStatusConstants.success:
        c = this.renderRandomView()
        break
      case apiStatusConstants.failure:
        c = this.renderFailureView()
        break
      case apiStatusConstants.inProgress:
        c = this.renderLoader()
        break
      default:
        c = null
    }

    switch (apiStatusTrending) {
      case apiStatusConstants.success:
        b = this.renderViewTrending()
        break
      case apiStatusConstants.failure:
        b = this.renderFailureView()
        break
      case apiStatusConstants.inProgress:
        b = this.renderLoader()
        break
      default:
        b = null
    }
    console.log(apiStatusOriginal)
    console.log(b)
    return (
      <div className="bg">
        <div>{c}</div>
        <div>
          <h1>Trending Now</h1>
          <div>{b}</div>
        </div>
        <div>
          <h1>Originals</h1>
          <div>{a}</div>
        </div>
        <div>
          <Icons />
        </div>
      </div>
    )
  }
}

export default Home
