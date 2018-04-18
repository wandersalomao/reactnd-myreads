import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom'

class Library extends Component {

    constructor(props) {
        super(props)
        this.onSelectMenu = this.onSelectMenu.bind(this)
    }

    static propTypes = {
        shelves: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired, 
        onUpdateBookShelf: PropTypes.func.isRequired
    }

    state = {
        selectedShelf: '' // the shelf currently selected by the user
    }

    /**
     * Method called when a shelf is selected on the side menu. Once a shelf is selected we display only books of that shelf. 
     * If the user clicks on a shelf that is currently selected this will deselect the current shelf and books from all 
     * the shelves will be displayed. 
     * 
     * @param {clickEvent} event 
     */
    onSelectMenu(event) {
        const menus = [...document.getElementsByClassName("menu-shelf")]

        let newShelf = event.currentTarget.id

        // deactivate all the menus 
        menus.forEach(menu => {
            menu.classList.remove("active")
        });

        // if the selected shelf is the current selected one, we clear it so that all shelves are displayed
        if (this.state.selectedShelf === newShelf) {
            newShelf = ''
        } else {
            // otherwise add the active class to the element to keep it selected
            event.currentTarget.classList.add("active")    
        }

        this.setState(() => ({selectedShelf: newShelf}))
    }

    render() {
        const { shelves, books, onUpdateBookShelf } = this.props
        const { selectedShelf } = this.state
        
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads App</h1>
                </div>
                <div className="list-books-menu">
                    <label>SHELVES</label>
                    
                    {shelves.map((shelf) => (
                        <div className="menu-shelf" key={shelf.key} id={shelf.key} onClick={this.onSelectMenu}>
                            <i className={shelf.icon}></i>
                            <span>{shelf.name}</span>
                        </div>
                    ))}

                    <hr/>
                </div>

                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            (selectedShelf === shelf.key || selectedShelf === '') &&
                                <BookShelf 
                                    key={shelf.key}
                                    shelf={shelf} 
                                    books={books.filter(book => book.shelf === shelf.key)}
                                    onUpdateBookShelf={onUpdateBookShelf} />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a Book</Link>
                </div>
            </div>
        )
    }
}

export default Library