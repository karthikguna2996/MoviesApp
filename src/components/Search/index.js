import Header from '../Header'

import MovieContext from '../../Context'

import './index.css'

const Search = () => (
  <MovieContext.Consumer>
    {value => {
      const {searchInput} = value
      return (
        <div className="bg">
          <Header />
          <p>{searchInput}</p>
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default Search
