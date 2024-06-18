import React from 'react'

const MovieContext = React.createContext({
  searchInput: 'hello',
  onChangeInput: () => {},
})

export default MovieContext
