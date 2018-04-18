/**
 * Mock for the BooksAPI file. It also contains dummy data.
 */

const books = [{
    id: '1', 
    title: "Book Test 1", 
    shelf: 'none',
    authors: ['Author Test 1'], 
    imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    }
}, {
    id: '2', 
    title: "Book Test 2", 
    shelf: 'none',
    authors: ['Author Test 2'], 
    imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    }
}, {
    id: '3', 
    title: "Book Test 3", 
    shelf: 'none',
    authors: ['Author Test 3'], 
    imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    }
}, {
    id: '4', 
    title: "Book Test 4", 
    shelf: 'none',
    authors: ['Author Test 4'], 
    imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    }
}, {
    id: '5', 
    title: "Book Test 5", 
    shelf: 'none',
    authors: ['Author Test 5'], 
    imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    }
}]

export const get = (bookId) => new Promise((resolve, reject) => {
    const book = books.find(book => book.id === bookId)
    resolve(book)
})

export const getAll = () => new Promise((resolve) => {
    resolve(books)
})

export const search = (query) => new Promise((resolve) => {
    const results = books.filter(book => book.title.includes(query))
    resolve(results)
})