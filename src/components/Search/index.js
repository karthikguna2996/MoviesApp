import Loader from 'react-loader-spinner'

import Header from '../Header'

import MovieContext from '../../Context'

import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  resultNotFound: 'ResultNotFound',
}

const renderLoader = () => (
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

const Search = () => (
  <MovieContext.Consumer>
    {value => {
      const {searchInput, searchDetails, apiStatusSearch, onClickSearch} = value
      const onClickFailure = () => {
        onClickSearch()
      }
      let a
      switch (apiStatusSearch) {
        case apiStatusConstants.success:
          a = (
            <ul className="popularMovies">
              {searchDetails.map(eachItem => (
                <MovieItem moviesDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          )
          break
        case apiStatusConstants.resultNotFound:
          a = (
            <>
              <img
                src="https://res.cloudinary.com/dr4t2w75n/image/upload/fl_preserve_transparency/v1718812341/Group_7394_nzdibj.jpg?_s=public-apps"
                alt="notFound"
              />
              <p>Your Search for {searchInput} did not found</p>
            </>
          )
          break
        case apiStatusConstants.failure:
          a = (
            <>
              <img
                src="https://res.cloudinary.com/dr4t2w75n/image/upload/fl_preserve_transparency/v1718812313/Group_1_atmtu0.jpg?_s=public-apps"
                alt="something_went_wrong"
              />
              <p>Something Went Wrong. Please Try Again</p>
              <button onClick={onClickFailure} type="button">
                Try Again
              </button>
            </>
          )
          break
        case apiStatusConstants.inProgress:
          a = renderLoader()
          break
        default:
          a = null
      }

      return (
        <div className="bg">
          <Header />
          {a}
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default Search
