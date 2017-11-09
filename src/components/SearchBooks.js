import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    booksInSearch: []
  }

  render() {
    const {books, booksInMyShelves, searchQuery, noResults, onUpdateShelf, searchBooks} = this.props;

    return (
      <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={searchQuery}
                  onChange={(event) => searchBooks(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
            {noResults ? (<h3 className="bookshelf">Sorry, no results found. Try a new keyword :)</h3>) : (
              <ol className="books-grid">
                {books.map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        onUpdateShelf={onUpdateShelf}
                      />
                    </li>
                ))}
              </ol>
            )}
            </div>
          </div>
    )
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    booksInMyShelves: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    noResults: PropTypes.bool.isRequired
  }

}

export default SearchBooks