import {Switch} from 'react-router-dom'

import Home from './components/Home'

import LoginRoute from './components/LoginRoute'

import ProtectedRoute from './components/ProtectedRoute'

import Popular from './components/Popular'

import Profile from './components/Profile'

import Search from './components/Search'

import './App.css'

const App = () => (
  <Switch>
    <LoginRoute exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <ProtectedRoute exact path="/search" component={Search} />
  </Switch>
)

export default App
