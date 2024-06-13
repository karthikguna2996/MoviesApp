import {Switch} from 'react-router-dom'

import Home from './components/Home'

import LoginRoute from './components/LoginRoute'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <LoginRoute exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
  </Switch>
)

export default App
