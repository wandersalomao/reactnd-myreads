import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

    // Definition of the current BookShelf options
    static CURRENTLY_READING = { key: 'currentlyReading', name: 'Currently Reading'}
    static WANT_TO_READ = { key: 'wantToRead', name: 'Want to Read'}
    static READ = { key: 'read', name: 'Read'}
    static NONE = { key: 'none', name: 'None'}

    static propTypes = {
        shelf: PropTypes.shape({
            key: PropTypes.string.isRequired, 
            name: PropTypes.string.isRequired
        }).isRequired,
        books: PropTypes.array.isRequired, 
        onUpdateBookShelf: PropTypes.func.isRequired
    }

    render() {
        const { shelf, books, onUpdateBookShelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
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

export default BookShelf