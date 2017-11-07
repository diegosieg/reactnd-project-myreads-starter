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
    // shelves definition
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  populateShelves = () => {
    let { currentlyReading, wantToRead, read} = []

    BooksAPI.getAll().then((books) => {
      if (books.length !== 0) {
        //get all books and sort by title
        books.sort(sortBy('title'));

        this.setState({ books });

        //filtering books by shelves categories and sort them by title
        currentlyReading = books.filter((book) => book.shelf === "currentlyReading").sort(sortBy('title'));
        wantToRead = books.filter((book) => book.shelf === "wantToRead").sort(sortBy('title'));
        read = books.filter((book) => book.shelf === "read").sort(sortBy('title'));

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
    const { books } = this.state;
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="app">

        <Route path="/search" render={({history}) => (
          <SearchBooks books={books}/>
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
