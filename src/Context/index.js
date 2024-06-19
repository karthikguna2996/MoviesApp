import React from 'react'

const MovieContext = React.createContext({
  searchInput: 'hello',
  onChangeInput: () => {},
  onClickSearch: () => {},
  searchDetails: [],
  isInputVisible: false,
  apiStatusSearch: '',
})

export default MovieContext
