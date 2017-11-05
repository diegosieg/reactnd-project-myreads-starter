import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelves from './BookShelves';

class MyReads extends Component {

  render() {
    const {currentlyReading, wantToRead, read} = this.props;

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
          />
        )}

        {wantToRead.length > 0 && (
          <BookShelves
            books={wantToRead}
            titleCategory="Want to Read"
            currentCategory="wantToRead"
          />
        )}

        {read.length > 0 && (
          <BookShelves
            books={read}
            titleCategory="Read"
            currentCategory="read"
          />
        )}


        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>

      </div>
    )
  }
}

export default MyReads