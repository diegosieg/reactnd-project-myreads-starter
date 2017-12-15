import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import sortBy from 'sort-by';
import MyReads from './components/MyReads';
import SearchBooks from './components/SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // all books
      books: [],
      searchQuery: '',
      noResults: false,
      // shelves definition
      booksInMyShelves: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
  }

  syncSearchAndShelvesItems = booksFromSearch => {
    const shelfBooksIds = this.state.booksInMyShelves.map(book => book.id);
    let mergedBooks = [];

    if (Array.isArray(booksFromSearch)) {
      mergedBooks = booksFromSearch.map(searchedBook => {
        if (shelfBooksIds.includes(searchedBook.id)) {
          return this.state.booksInMyShelves.find(
            shelfBook => shelfBook.id === searchedBook.id,
          );
        } else {
          return searchedBook;
        }
      });
    }

    return mergedBooks;
  };

  searchBooks = value => {
    this.setState({ searchQuery: value });

    if (value.length > 2) {
      BooksAPI.search(value, 20).then(books => {
        if (books.error === 'empty query') {
          this.setState({ books: [], noResults: true });
        } else {
          this.setState({ noResults: false });
          this.setState({
            books: this.syncSearchAndShelvesItems(books),
          });
        }
      });
    } else {
      this.setState({ books: [], noResults: false });
    }
  };

  clearSearch = () => {
    this.setState({ searchQuery: '', books: [] });
  };

  deleteBookFromSearchList = bookId => {
    const filteredBookList = this.state.books.filter(
      book => book.id !== bookId,
    );
    this.setState({ books: filteredBookList });
  };

  populateShelves = () => {
    let { currentlyReading, wantToRead, read } = [];

    BooksAPI.getAll().then(booksInMyShelves => {
      if (booksInMyShelves.length !== 0) {
        //get all booksInMyShelves and sort by title
        booksInMyShelves.sort(sortBy('title'));

        this.setState({ booksInMyShelves });

        //filtering booksInMyShelves by shelves categories and sort them by title
        currentlyReading = booksInMyShelves
          .filter(book => book.shelf === 'currentlyReading')
          .sort(sortBy('title'));
        wantToRead = booksInMyShelves
          .filter(book => book.shelf === 'wantToRead')
          .sort(sortBy('title'));
        read = booksInMyShelves
          .filter(book => book.shelf === 'read')
          .sort(sortBy('title'));

        this.setState({ currentlyReading, wantToRead, read });
      }
    });
  };

  updateShelf = (book, shelfName) => {
    BooksAPI.update(book, shelfName).then(books => {
      this.populateShelves();
    });
    this.deleteBookFromSearchList(book.id);
  };

  componentDidMount() {
    this.populateShelves();
  }

  render() {
    const { books, searchQuery, noResults } = this.state;
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              booksFromSearch={books}
              updateShelf={this.updateShelf}
              searchQuery={searchQuery}
              noResults={noResults}
              searchBooks={this.searchBooks}
              clearSearch={this.clearSearch}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <MyReads
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              updateShelf={this.updateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
