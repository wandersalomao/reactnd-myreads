import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import Library from './Library'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf';

class App extends Component {
  state = {
    books: [], // the list of books currently in the bookshelves of the app 
    shelves: [BookShelf.CURRENTLY_READING, BookShelf.WANT_TO_READ, BookShelf.READ]
  }

  /**
   * As soon as the component finishes rendering, we use the BooksAPI to get the list of books to be displayed 
   */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  /**
   * This method is responsible for assigning a given book to a new shelf. Since there are multiple components that can update 
   * a book shelf, this method is defined here in the parent and is passed down to the children. The child components will then 
   * call it when the state needs to be changed. 
   *   
   * @param {Book} currentBook - The current book being changed 
   * @param {string} newShelf - The new shelf the book will be assigned to
   */
  updateBookShelf(currentBook, newShelf) {
    BooksAPI.update(currentBook, newShelf).then((result) => {
      
      // update the shelf of current book so that when we add it back to the array of books, it will contain
      // the most recent state of the book. We could also have used the API to get all the books again, but just updating
      // the array of books will have the same result and will save us from doing a remote call. 
      currentBook.shelf = newShelf

      this.setState((currentState) => ({
        books: currentState.books
            .filter(book => book.id !== currentBook.id) // remove the current book from the array of books if one exists
            .concat([currentBook]) // add the current book to the array of books
      }))
      
      const shelfName = this.state.shelves.filter(shelf => shelf.key === newShelf)[0].name
      this.displayAlertMessage(`Book successfully moved to the shelf '${shelfName}'`)
    })
  }

  /**
   * Displays a temporary message on the UI indicating the result of an operation (For example when a book is moved 
   * to a different shelf). 
   * 
   * @param {string} messageText - The message to be displayed
   */
  displayAlertMessage(messageText) {
    const alertMessage = document.getElementById("alert-message")
      
    alertMessage.className = "show"
    alertMessage.innerText = messageText

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => { alertMessage.className = alertMessage.className.replace("show", ""); }, 3000)
  }

  render() {
    const { books, shelves } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library 
            shelves={shelves}
            books={books} 
            onUpdateBookShelf={this.updateBookShelf.bind(this)} />
        )} />

        <Route path='/search' render={({ history }) => (
          <SearchBooks 
            books={books}
            onUpdateBookShelf={this.updateBookShelf.bind(this)} />
        )} />

        <div id="alert-message">Alert Message goes here...</div>

      </div>
    )
  }
}

export default App;