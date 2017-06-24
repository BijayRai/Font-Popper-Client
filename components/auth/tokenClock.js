// @flow
type Time = {
  exp: number,
  isExpired: boolean,
  minLeft: number,
  refresh: boolean,
  refreshWindow: number,
  secLeft: number
}
export default ({isExpired, minLeft, secLeft}: Time) => {
  return (
    <div>
      <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82FA58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }

        .light {
          background-color: #999;
        }
      `}</style>
      <p>Is token expired</p>
      <p>
        {isExpired.toString()}
      </p>
      <p>Time Left on Token</p>
      <p>
        {minLeft.toString()}
        {' '}
        min :
        {' '}
        {secLeft || 0}
        {' '}
        secs
      </p>
    </div>
  )
}
