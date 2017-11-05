import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import MyReads from './components/MyReads';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    let { currentlyReading, wantToRead, read} = []

    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books);

      //filtering these books by shelves categories
      if (books.length !== 0) {
        currentlyReading = books.filter((book) => book.shelf === "currentlyReading")
        wantToRead = books.filter((book) => book.shelf === "wantToRead")
        read = books.filter((book) => book.shelf === "read")
        this.setState({currentlyReading, wantToRead, read})
      }
    })
  }

  render() {
    const { books } = this.state;
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="app">

        <Route path="/search" render={({history}) => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>

        <Route exact path="/" render={() => (
          <MyReads
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
