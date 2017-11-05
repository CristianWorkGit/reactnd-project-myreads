import _ from 'lodash'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import Home from './Home'
import Search from './Search'
import BOOKSHELVES from './consts/BOOKSHELVES'

import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      bookshelves: [],
      bookSearchResult: {
        books: []
      }
    }
    this.handleSearch = _.debounce(this.handleSearch.bind(this), 400)
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this)
    this.hangleInputSearch = this.hangleInputSearch.bind(this)
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

  hangleInputSearch(query) {
    this.setState({ query: query.trim() })
    this.handleSearch(query)
  }

  handleSearch(query) {
    let bookSearchResult = {}

    BooksAPI.search(escapeRegExp(query)).then(results => {
      if (!results || results.error) {
        bookSearchResult = {
          error: 'Couldn`t find a book for this query, please try again',
          books: []
        }
      } else {
        bookSearchResult.books = results
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
    const { bookshelves, query, bookSearchResult } = this.state

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
          <Route
            path="/search"
            render={({ history }) => (
              <Search
                history={history}
                query={query}
                bookSearchResult={bookSearchResult}
                bookshelves={bookshelves}
                onUpdateStatus={this.handleUpdateStatus}
                onSearch={this.hangleInputSearch}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default BooksApp
