import {Component} from 'react'

import {Switch} from 'react-router-dom'

import Home from './components/Home'

import LoginRoute from './components/LoginRoute'

import ProtectedRoute from './components/ProtectedRoute'

import Popular from './components/Popular'

import Profile from './components/Profile'

import Search from './components/Search'

import MovieDetails from './components/MovieDetails'

import MovieContext from './Context'

import './App.css'

class App extends Component {
  state = {
    searchInput: '',
  }

  onChangeInput(searchText) {
    this.setState({searchInput: searchText})
  }

  render() {
    const {searchInput} = this.state

    return (
      <MovieContext.Provider
        value={{
          searchInput,
          onChangeInput: this.onChangeInput,
        }}
      >
        <Switch>
          <LoginRoute exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default App
