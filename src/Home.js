import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class Home extends Component {
  static propTypes = {
    bookshelves: PropTypes.array.isRequired,
    onUpdateStatus: PropTypes.func.isRequired
  }

  render() {
    const { bookshelves, onUpdateStatus } = this.props

    return (
      <div>
        <div className="list-books-title">
          <h1>My Reads</h1>
          <div className="open-search">
            <Link to="/search">Search</Link>
          </div>
        </div>
        <div className="list-books-content">
          {bookshelves.map(bookshelf => (
            <Bookshelf
              bookshelf={bookshelf}
              key={bookshelf.shelf}
              onUpdateStatus={onUpdateStatus}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Home
