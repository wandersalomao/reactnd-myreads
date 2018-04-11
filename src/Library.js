import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom'

class Library extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired, 
        onUpdateBookShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, onUpdateBookShelf } = this.props
        
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads App</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            shelf={BookShelf.CURRENTLY_READING} 
                            books={books.filter(book => book.shelf === BookShelf.CURRENTLY_READING.key)}
                            onUpdateBookShelf={onUpdateBookShelf} />
                        <BookShelf
                            shelf={BookShelf.WANT_TO_READ}
                            books={books.filter(book => book.shelf === BookShelf.WANT_TO_READ.key)}
                            onUpdateBookShelf={onUpdateBookShelf} />
                        <BookShelf 
                            shelf={BookShelf.READ}
                            books={books.filter(book => book.shelf === BookShelf.READ.key)}
                            onUpdateBookShelf={onUpdateBookShelf} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' className='add-contact'>Add a Book</Link>
                </div>
            </div>
        )
    }
}

export default Library