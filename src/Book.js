import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class Book extends Component {
    
    static propTypes = {
        book: PropTypes.object.isRequired, 
        onUpdateBookShelf: PropTypes.func.isRequired
    }

    /**
     * Called when the user selects a new shelf for the current book. It delegates to the 
     * onUpdateBookShelf function the responsibility of updating the book shelf. 
     * 
     * @param {*} newShelf - the new shelf the current book should be assigned to
     */
    handleChange(newShelf) {
        this.props.onUpdateBookShelf(this.props.book, newShelf)
    }

    render() {
        const { book } = this.props
        const bookCoverURL = book.imageLinks ? book.imageLinks.thumbnail : ''

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ 
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${bookCoverURL})`}}>
                    </div>
                    <div className="book-shelf-changer">
                        <select 
                            defaultValue={book.shelf}
                            onChange={(event) => this.handleChange(event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value={BookShelf.CURRENTLY_READING.key}>{BookShelf.CURRENTLY_READING.name}</option>
                            <option value={BookShelf.WANT_TO_READ.key}>{BookShelf.WANT_TO_READ.name}</option>
                            <option value={BookShelf.READ.key}>{BookShelf.READ.name}</option>
                            <option value={BookShelf.NONE.key}>{BookShelf.NONE.name}</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>
                ))}
            </div>
        )    
    }
}

export default Book