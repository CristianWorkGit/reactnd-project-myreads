import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Search extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    bookshelves: PropTypes.array.isRequired,
    bookSearchResult: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onUpdateStatus: PropTypes.func.isRequired
  }

  render() {
    const {
      query,
      history,
      bookshelves,
      bookSearchResult,
      onUpdateStatus,
      onSearch
    } = this.props

    const booksOnBookshelves = bookshelves.reduce(
      (books, bookshelf) => books.concat(bookshelf.books),
      []
    )

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => history.push('/')}>
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={event => onSearch(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!bookSearchResult.length && <span>{bookSearchResult.error}</span>}
            {bookSearchResult.books.map(book => {
              const onBookshelf = booksOnBookshelves.find(
                bookOnBookshelf => bookOnBookshelf.id === book.id
              )
              return (
                <Book
                  book={onBookshelf || book}
                  key={book.id}
                  onUpdateStatus={onUpdateStatus}
                />
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
