const FailureMovieFetch = props => {
  const {onClickTryAgain} = props
  const clickTryAgain = () => {
    onClickTryAgain()
  }
  return (
    <>
      <p>Something went wrong</p>
      <button type="button" onClick={clickTryAgain}>
        Try Again
      </button>
    </>
  )
}
export default FailureMovieFetch
