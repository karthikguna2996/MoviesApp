const MovieDetailsFailureView = props => {
  const {onClickTryAgainMovieDetail} = props
  const clickTryAgain = () => {
    onClickTryAgainMovieDetail()
  }
  return (
    <>
      <img
        src="https://res.cloudinary.com/dr4t2w75n/image/upload/fl_preserve_transparency/v1718812313/Group_1_atmtu0.jpg?_s=public-apps"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={clickTryAgain}>
        Try Again
      </button>
    </>
  )
}
export default MovieDetailsFailureView
