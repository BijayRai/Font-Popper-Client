// @flow
import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.stores.pages,
    currentPage: state.pagination.currentPage
  }
}
type Props = {
  pages: number,
  currentPage: number
}
export default connect(mapStateToProps)((props: Props) => {
  const {pages, currentPage} = props

  const nextButton = () => {
    if (currentPage < pages) {
      return (
        <div className='pagination__next'>
          <Link
            prefetch
            as={`/stores/page/${parseInt(currentPage) + 1}`}
            href={`/store/page?pageId=${parseInt(currentPage) + 1}`}
          >
            <a>Next</a>
          </Link>
        </div>
      )
    }
  }

  const prevButton = () => {
    if (currentPage > 1) {
      return (
        <div className='pagination__prev'>
          <Link
            as={`/stores/page/${parseInt(currentPage) - 1}`}
            href={`/store/page?pageId=${parseInt(currentPage) - 1}`}
          >
            <a>Prev</a>
          </Link>
        </div>
      )
    }
  }
  return (
    <div className='pagination'>
      {prevButton()}
      <div className='pagination__text'>Page {currentPage} of {pages}</div>
      {nextButton()}
    </div>
  )
})
