import React from 'react'

const MovieContext = React.createContext({
  searchInput: '',
  onChangeInput: () => {},
  onClickSearch: () => {},
  searchDetails: [],
  isInputVisible: false,
  apiStatusSearch: '',
  username: '',
  password: '',
  onClickUserName: () => {},
  onClickPassword: () => {},
  onClickLoginForm: () => {},
  err: false,
})

export default MovieContext
