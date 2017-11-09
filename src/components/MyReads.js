import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelves from './BookShelves';

function MyReads(props) {
  const {currentlyReading, wantToRead, read, onUpdateShelf} = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      {currentlyReading.length > 0 && (
        <BookShelves
          books={currentlyReading}
          titleCategory="Currently Reading"
          currentCategory="currentlyReading"
          onUpdateShelf={onUpdateShelf}
        />
      )}

      {wantToRead.length > 0 && (
        <BookShelves
          books={wantToRead}
          titleCategory="Want to Read"
          currentCategory="wantToRead"
          onUpdateShelf={onUpdateShelf}
        />
      )}

      {read.length > 0 && (
        <BookShelves
          books={read}
          titleCategory="Read"
          currentCategory="read"
          onUpdateShelf={onUpdateShelf}
        />
      )}


      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>

    </div>
  )
}

MyReads.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default MyReads