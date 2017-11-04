import React, { Component } from 'react'
import BOOKS_CATEGORY from './consts/BOOKS_CATEGORY'

class BookCategorySelector extends Component {
  render() {
    const { book, onUpdateStatus } = this.props

    return (
      <div className="book-shelf-changer">
        <select
          value={book.shelf || 'none'}
          onChange={event => onUpdateStatus(book, event.target.value)}
        >
          {BOOKS_CATEGORY.map((bookCategory, index) => (
            <option
              key={index}
              value={bookCategory.value}
              disabled={bookCategory.disable}
            >
              {bookCategory.title}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default BookCategorySelector
