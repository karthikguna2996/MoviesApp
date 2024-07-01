import {Component} from 'react'

import {Switch, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import Home from './components/Home'

import LoginRoute from './components/LoginRoute'

import ProtectedRoute from './components/ProtectedRoute'

import Popular from './components/Popular'

import Profile from './components/Profile'

import Search from './components/Search'

import MovieDetails from './components/MovieDetails'

import NotFoundRoute from './components/NotFoundRoute'

import MovieContext from './Context'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  resultNotFound: 'ResultNotFound',
}

class App extends Component {
  state = {
    searchInput: '',
    searchDetails: [],
    isInputVisible: false,
    apiStatusSearch: apiStatusConstants.initial,
    username: '',
    password: '',
    err: '',
  }

  onClickUserName = value => {
    this.setState({username: value})
  }

  onClickPassword = value => {
    this.setState({password: value})
  }

  onClickLoginForm = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      Cookies.set('username', username, {expires: 30})
      Cookies.set('password', password, {expires: 30})
      history.replace('/')
    } else {
      this.setState({err: true})
    }
  }

  getSearchResults = async () => {
    const {searchInput} = this.state

    this.setState({apiStatusSearch: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log(searchInput)
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`,
      options,
    )

    if (response.ok === true) {
      const data2 = await response.json()
      const searchMovies = data2.results
      const searchedMovies = searchMovies.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      if (searchMovies.length === 0) {
        this.setState({
          searchDetails: [...searchedMovies],
          isInputVisible: true,
          apiStatusSearch: apiStatusConstants.resultNotFound,
        })
      } else {
        this.setState({
          searchDetails: [...searchedMovies],
          isInputVisible: true,
          apiStatusSearch: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({
        apiStatusSearch: apiStatusConstants.failure,
      })
    }
  }

  onClickSearch = () => {
    this.getSearchResults()
  }

  onChangeInput = searchText => {
    this.setState({searchInput: searchText})
  }

  render() {
    const {
      searchInput,
      searchDetails,
      isInputVisible,
      apiStatusSearch,
      username,
      password,
      err,
    } = this.state

    return (
      <MovieContext.Provider
        value={{
          searchInput,
          onChangeInput: this.onChangeInput,
          onClickSearch: this.onClickSearch,
          searchDetails,
          isInputVisible,
          apiStatusSearch,
          username,
          password,
          err,
          onClickUserName: this.onClickUserName,
          onClickPassword: this.onClickPassword,
          onClickLoginForm: this.onClickLoginForm,
        }}
      >
        <Switch>
          <LoginRoute exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
          <NotFoundRoute />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default withRouter(App)
