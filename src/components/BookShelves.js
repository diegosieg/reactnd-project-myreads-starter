import React, { Component } from 'react';
import Book from './Book';
//import { Link } from 'react-router-dom'

class BookShelves extends Component {

  render() {
    const {books, titleCategory} = this.props;

    return (
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{titleCategory}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                {books.map((book) => (
                  <li key={book.id}>
                    <Book book={book}/>
                  </li>
                  )
                )}

                </ol>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default BookShelves