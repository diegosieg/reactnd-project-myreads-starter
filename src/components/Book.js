import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom'

function Book(props) {
  const {book, onUpdateShelf} = props;
  let authors = book.authors.join(", ");

  return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''})`}}></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(e) => {
              onUpdateShelf(book, e.target.value)
              }
            }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
  )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
}

export default Book