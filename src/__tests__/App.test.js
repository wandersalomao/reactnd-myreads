import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { MemoryRouter, Link } from 'react-router-dom';
import BookShelf from '../BookShelf';
import TestUtils from 'react-dom/test-utils';
import Library from '../Library';
import Book from '../Book';

// This commands loads the mocked BooksAPI.js as defined in __mocks__/BooksAPI.js
jest.mock('../utils/BooksAPI')

describe('general application tests', () => {
  it('should render the application without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
          <App/>
      </MemoryRouter>, div);
  })

  it ('should properly render the search page when using the search route', () => {
    const app = TestUtils.renderIntoDocument(
      <MemoryRouter initialEntries={['/search']}>
        <App/>
      </MemoryRouter>)
    
    // the search-books element should exist 
    const searchBooksArray = TestUtils.scryRenderedDOMComponentsWithClass(app, 'search-books')
    expect(searchBooksArray).toHaveLength(1)

    // the Library component should not exist 
    const libraryArray = TestUtils.scryRenderedComponentsWithType(app, Library)
    expect(libraryArray).toHaveLength(0)
  })

  it ('should properly render the library page when using the default route', () => {
    const app = TestUtils.renderIntoDocument(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>)
    
    // the search-books element should not exist 
    const searchBooksArray = TestUtils.scryRenderedDOMComponentsWithClass(app, 'search-books')
    expect(searchBooksArray).toHaveLength(0)

    // the Library component should exist 
    const libraryArray = TestUtils.scryRenderedComponentsWithType(app, Library)
    expect(libraryArray).toHaveLength(1)
  })
})

describe('test Bookshelves menu filter', () => {
  it('displays all shelves if no menu is selected', () => {
    const app = TestUtils.renderIntoDocument(<MemoryRouter><App/></MemoryRouter>)

    // 3 menus should exist, one for each shelf 
    const menus = TestUtils.scryRenderedDOMComponentsWithClass(app, 'menu-shelf')
    expect(menus).toHaveLength(3)

    // since there no filter selected, 3 bookshelves should exist 
    const bookshelves = TestUtils.scryRenderedComponentsWithType(app, BookShelf)
    expect(bookshelves).toHaveLength(3)
  })

  it('displays Currently Reading shelf only', () => {
    const app = TestUtils.renderIntoDocument(<MemoryRouter><App/></MemoryRouter>)
    const menus = TestUtils.scryRenderedDOMComponentsWithClass(app, 'menu-shelf')
    const currentlReadingMenu = menus.find(menu => menu.id === BookShelf.CURRENTLY_READING.key)
    
    // clicking on the menu should filter out the shelves being displayed
    TestUtils.Simulate.click(currentlReadingMenu)
    let bookshelves = TestUtils.scryRenderedDOMComponentsWithClass(app, 'bookshelf')
    expect(bookshelves).toHaveLength(1)

    // clicking on the selected menu again should deselect it and display all the shelves
    TestUtils.Simulate.click(currentlReadingMenu)
    bookshelves = TestUtils.scryRenderedDOMComponentsWithClass(app, 'bookshelf')
    expect(bookshelves).toHaveLength(3)
  })

  it('displays Want To Read shelf only', () => {
    const app = TestUtils.renderIntoDocument(<MemoryRouter><App/></MemoryRouter>)
    const menus = TestUtils.scryRenderedDOMComponentsWithClass(app, 'menu-shelf')
    const wantToReadMenu = menus.find(menu => menu.id === BookShelf.WANT_TO_READ.key)
    
    // clicking on the menu should filter out the shelves being displayed
    TestUtils.Simulate.click(wantToReadMenu)
    let bookshelves = TestUtils.scryRenderedDOMComponentsWithClass(app, 'bookshelf')
    expect(bookshelves).toHaveLength(1)

    // clicking on the selected menu again should deselect it and display all the shelves
    TestUtils.Simulate.click(wantToReadMenu)
    bookshelves = TestUtils.scryRenderedDOMComponentsWithClass(app, 'bookshelf')
    expect(bookshelves).toHaveLength(3)
  })

  it('displays Read shelf only', () => {
    const app = TestUtils.renderIntoDocument(<MemoryRouter><App/></MemoryRouter>)
    const menus = TestUtils.scryRenderedDOMComponentsWithClass(app, 'menu-shelf')
    const readMenu = menus.find(menu => menu.id === BookShelf.READ.key)
    
    // clicking on the menu should filter out the shelves being displayed
    TestUtils.Simulate.click(readMenu)
    let bookshelves = TestUtils.scryRenderedDOMComponentsWithClass(app, 'bookshelf')
    expect(bookshelves).toHaveLength(1)

    // clicking on the selected menu again should deselect it and display all the shelves
    TestUtils.Simulate.click(readMenu)
    bookshelves = TestUtils.scryRenderedDOMComponentsWithClass(app, 'bookshelf')
    expect(bookshelves).toHaveLength(3)
  })
})

describe('test searching page', () => {
  it('displays search results correctly', async () => {
    const app = TestUtils.renderIntoDocument(
      <MemoryRouter initialEntries={['/search']}>
        <App/>
      </MemoryRouter>)
    
    // before start searching there shouldn't exist any book being displayed
    let books = TestUtils.scryRenderedComponentsWithType(app, Book)
    expect(books).toHaveLength(0)

    const searchInput = TestUtils.findRenderedDOMComponentWithTag(app, 'input')
    
    // search for books containing the number 1 - only one book should be displayed
    searchInput.textContent = '1'
    await TestUtils.Simulate.change(searchInput, {target: {value: '1'}})
    
    books = TestUtils.scryRenderedComponentsWithType(app, Book)
    expect(books).toHaveLength(1)

    // clear search results - no books should be displayed
    searchInput.textContent = ''
    await TestUtils.Simulate.change(searchInput, {target: {value: ''}})
    
    books = TestUtils.scryRenderedComponentsWithType(app, Book)
    expect(books).toHaveLength(0)
    
    // search for books containing the word 'Book Test' - 5 books should be displayed
    searchInput.textContent = 'Book Test'
    await TestUtils.Simulate.change(searchInput, {target: {value: 'Book Test'}})
    
    books = TestUtils.scryRenderedComponentsWithType(app, Book)
    expect(books).toHaveLength(5)
  })
})