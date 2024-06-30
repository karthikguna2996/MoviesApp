const RenderFailureViewPopular = props => {
  const {onClickTryAgainPopular} = props
  const clickTryAgain = () => {
    onClickTryAgainPopular()
  }
  return (
    <>
      <img
        src="https://asset.cloudinary.com/dr4t2w75n/59411ae41d618ff9c6feeff0e769ed6a"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={clickTryAgain}>
        Try Again
      </button>
    </>
  )
}
export default RenderFailureViewPopular
