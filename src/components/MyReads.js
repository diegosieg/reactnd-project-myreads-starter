import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelves from './BookShelves';
import Stats from './Stats';

function MyReads(props) {
  const { currentlyReading, wantToRead, read, updateShelf } = props;
  const statsBooks = [
    { currentlyReading: currentlyReading, wantToRead: wantToRead, read: read },
  ];

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
          updateShelf={updateShelf}
        />
      )}

      {wantToRead.length > 0 && (
        <BookShelves
          books={wantToRead}
          titleCategory="Want to Read"
          currentCategory="wantToRead"
          updateShelf={updateShelf}
        />
      )}

      {read.length > 0 && (
        <BookShelves
          books={read}
          titleCategory="Read"
          currentCategory="read"
          updateShelf={updateShelf}
        />
      )}

      <Stats statsBooks={statsBooks} />

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

MyReads.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default MyReads;
