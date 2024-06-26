const FailureMovieFetch = props => {
  const {onClickTryAgain} = props
  const clickTryAgain = () => {
    onClickTryAgain()
  }
  return (
    <>
      <img
        src="https://asset.cloudinary.com/dr4t2w75n/eeab1637c57c3ddbb907e56a9ef0402d"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={clickTryAgain}>
        Try Again
      </button>
    </>
  )
}
export default FailureMovieFetch
