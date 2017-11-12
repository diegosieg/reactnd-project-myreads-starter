import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

function SearchBooks(props) {
  const {booksFromSearch, searchQuery, noResults, updateShelf, searchBooks, clearSearch} = props;

  return (
    <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search" onClick={clearSearch}>Close</Link>
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
          {noResults ? (<h3>Sorry, no results found. Try a new keyword :)</h3>) : (
            <ol className="books-grid">
              {booksFromSearch.map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      updateShelf={updateShelf}
                    />
                  </li>
              ))}
            </ol>
          )}
          </div>
        </div>
  )
}

SearchBooks.propTypes = {
    booksFromSearch: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    noResults: PropTypes.bool.isRequired
  }

export default SearchBooks