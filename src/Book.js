import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksCategory from './BooksCategory'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateStatus: PropTypes.func.isRequired
  }

  render() {
    const { book, onUpdateStatus } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            />
            <BooksCategory book={book} onUpdateStatus={onUpdateStatus} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(', ')}
          </div>
        </div>
      </li>
    )
  }
}

export default Book
