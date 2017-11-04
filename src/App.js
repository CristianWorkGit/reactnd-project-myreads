import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import * as BooksAPI from './BooksAPI'
import BOOKSHELVES from './consts/BOOKSHELVES'
import './App.css'
import sortBy from 'sort-by'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      bookshelves: [],
      bookSearchResult: {}
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll().then(results => {
      const bookshelves = BOOKSHELVES.map(bookshelf => {
        bookshelf.books = results.filter(_ => _.shelf === bookshelf.shelf) || []
        return bookshelf
      }).sort(sortBy('title'))
      this.setState({ bookshelves })
    })
  }

  handleSearch(query) {
    let bookSearchResult = {}

    BooksAPI.search(query).then(results => {
      if (results.error || results.books.error) {
        bookSearchResult = {
          error: 'Couldn`t find a book for this query, please try again',
          books: []
        }
      }

      this.setState({ bookSearchResult })
    })
  }

  handleUpdateStatus(book, category) {
    this.setState(prev => {
      let { bookshelves } = prev

      const previousCategory = bookshelves.find(bookshelf => {
        return bookshelf.shelf === book.shelf
      })

      const newCategory = bookshelves.find(bookshelf => {
        return bookshelf.shelf === category
      })

      bookshelves = bookshelves.filter(bookshelf => {
        return bookshelf.shelf !== book.shelf && bookshelf.shelf !== category
      })

      book.shelf = category

      if (previousCategory) {
        previousCategory.books = previousCategory.books.filter(
          prevBook => prevBook.id !== book.id
        )
        bookshelves.push(previousCategory)
      }

      if (newCategory) {
        newCategory.books.push(book)
        bookshelves.push(newCategory)
      }

      bookshelves = bookshelves.sort(sortBy('title'))

      BooksAPI.update(book, category).then(() => {
        return { bookshelves }
      })
    })
  }

  render() {
    const { bookshelves } = this.state

    return (
      <div className="app">
        <div className="list-books">
          <Route
            exact
            path="/"
            render={() => (
              <Home
                bookshelves={bookshelves}
                onUpdateStatus={this.handleUpdateStatus}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default BooksApp
