import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import sortBy from 'sort-by';
import MyReads from './components/MyReads';
import SearchBooks from './components/SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    // all books
    books: [],
    searchQuery: '',
    noResults: false,
    // shelves definition
    booksInMyShelves: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  searchBooks = (value) => {
    this.setState({searchQuery: value})

    if(value.length > 2){
      BooksAPI.search(value, 20).then((books) => {
        if(books.error === "empty query"){
          this.setState({ books: [], noResults: true })
        }else{
          this.setState({ books, noResults: false })
        }
      })
    }else{
      this.setState({ books: [], noResults: false })
    }
  }

  populateShelves = () => {
    let { currentlyReading, wantToRead, read} = []

    BooksAPI.getAll().then((booksInMyShelves) => {
      if (booksInMyShelves.length !== 0) {
        //get all booksInMyShelves and sort by title
        booksInMyShelves.sort(sortBy('title'));

        this.setState({ booksInMyShelves });

        //filtering booksInMyShelves by shelves categories and sort them by title
        currentlyReading = booksInMyShelves.filter((book) => book.shelf === "currentlyReading").sort(sortBy('title'));
        wantToRead = booksInMyShelves.filter((book) => book.shelf === "wantToRead").sort(sortBy('title'));
        read = booksInMyShelves.filter((book) => book.shelf === "read").sort(sortBy('title'));

        this.setState({currentlyReading, wantToRead, read});
      }
    });
  }

  onUpdateShelf = (book, shelfName) => {
    BooksAPI.update(book, shelfName).then((books) => {
      this.populateShelves();
    })
  }

  componentDidMount() {
    this.populateShelves();
  }

  render() {
    const { books, searchQuery, noResults } = this.state;
    const { currentlyReading, wantToRead, read, booksInMyShelves } = this.state;

    return (
      <div className="app">

        <Route path="/search" render={({history}) => (
          <SearchBooks
            books={books}
            booksInMyShelves={booksInMyShelves}
            onUpdateShelf={this.onUpdateShelf}
            searchQuery={searchQuery}
            noResults={noResults}
            searchBooks={this.searchBooks}
          />
        )}/>

        <Route exact path="/" render={() => (
          <MyReads
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            onUpdateShelf={this.onUpdateShelf}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
