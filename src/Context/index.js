import React from 'react'

const MovieContext = React.createContext({
  searchInput: '',
  onChangeInput: () => {},
  onClickSearch: () => {},
  searchDetails: [],
  isInputVisible: false,
  apiStatusSearch: '',
})

export default MovieContext
