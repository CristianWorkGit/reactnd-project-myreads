import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  static PropTypes = {
    bookshelf: PropTypes.object.isRequired,
    onUpdateStatus: PropTypes.func.isRequired
  }

  render() {
    const { bookshelf, onUpdateStatus } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {!bookshelf.books.length && (
              <span className="book-empty-list">No books</span>
            )}
            {bookshelf.books.map(book => (
              <Book book={book} key={book.id} onUpdateStatus={onUpdateStatus} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
