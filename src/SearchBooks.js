import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Book from './Book'
import BookShelf from './BookShelf';

class SearchBooks extends Component {

    constructor(props) {
        super(props)
        this.synchronizeListOfBooks = this.synchronizeListOfBooks.bind(this)
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired
    }

    state = {
        query: '', // the query used by the user to search for books 
        searchResults: [] // the array of books returned by the api
    }
    
    /**
     * Performs the book search using the input provided by the user 
     * 
     * @param {*} query - The query string containing the search input 
     */
    updateQuery(query) {
        this.setState(() => ({
            query: query
        }))

        if (query) {
            BooksAPI.search(query).then((searchResults) => {
                if (!searchResults.error) {
                    this.synchronizeListOfBooks(searchResults)
                    this.setState(() => ({
                        searchResults: searchResults                        
                    }))
                } else {
                    this.setState(() => ({
                        searchResults: []
                    }))
                }
            })
        } else {
            this.setState(() => ({
                searchResults: []
            }))
        }
    }

    /**
     * Synchronizes the books currently on the shelves with the books returned by the search. This is necessary 
     * because books returned by the search do not have shelf information so in order to display it on the search screen
     * we need to sync it with the books currently on the shelves. If the book is not assigned to any shelf, the option 
     * 'None' should be selected by default. 
     * 
     * @param {*} searchResults - The list of books returned by the search 
     */
    synchronizeListOfBooks(searchResults) {
        searchResults.forEach(result => {
            const bookAlreadyOnShelf = this.props.books.find(book => book.id === result.id)
            result.shelf = bookAlreadyOnShelf ? bookAlreadyOnShelf.shelf : BookShelf.NONE.key
        })
    }

    render() {
        const { query, searchResults } = this.state
        const { onUpdateBookShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map((book) => (
                            <li key={book.id}>
                                <Book 
                                    book={book} 
                                    onUpdateBookShelf={onUpdateBookShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks