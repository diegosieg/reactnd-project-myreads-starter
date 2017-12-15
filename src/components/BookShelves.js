import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookShelves(props) {
  const { books, titleCategory, updateShelf } = props;

  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">
            {titleCategory}
            <span className="bookshelf-qtd">
              {books.length >= 2
                ? `${books.length} books`
                : `${books.length} book`}
            </span>
          </h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map(book => (
                <li key={book.id}>
                  <Book book={book} updateShelf={updateShelf} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

BookShelves.propTypes = {
  books: PropTypes.array.isRequired,
  titleCategory: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default BookShelves;
