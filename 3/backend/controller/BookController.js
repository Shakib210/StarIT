import asyncHandler from 'express-async-handler'
import Book from '../model/BookModel.js'


  // @desc    Fetch single Book
  // @route   GET /api/books/:name
  // @access  Public
  const getBookByName = asyncHandler(async (req, res) => {
    const name= req.params.name
    const book = await Book.find( {
      $and : [
               { 
                 $or : [ 
                         {"bookName" : name},
                         {"author" : name}
                       ]
               },
               { 
                 "isVisible":true
               }
             ]
    } )
  
    if (book) {
      res.json(book)
    } else {
      res.status(404)
      throw new Error('Book not found')
    }
  })



  
  
  // @desc    Delete a Book
  // @route   DELETE /api/books/:id
  // @access  Private/Admin
  const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
  
    if (book) {
      book.isVisible=false
      await book.save()
      res.json({ message: 'Book removed' })
    } else {
      res.status(404)
      throw new Error('Book not found')
    }
  })
  
  // @desc    Create a Book
  // @route   POST /api/books
  // @access  Private/Admin
  const createBook = asyncHandler(async (req, res) => {
    const {bookName,author,price,date}=req.body
    const book = await Book.create({
      bookName,
      author,
      price,
      date
    })

    if (book) {
      res.status(201).json({
        _id: book._id,
        BookName:book.bookName,
        Author: book.author,
        Price: book.price,
        date:book.date
      })
    } else {
      res.status(400)
      throw new Error('Invalid book data')
    }
  })
  
  // @desc    Update a Book
  // @route   PUT /api/books/:id
  // @access  Private/Admin
  const updateBook = asyncHandler(async (req, res) => {
    const {
      bookName,
      author,
      price,
      date
    } = req.body
  
    const book = await Book.findById(req.params.id)
  
    if (book) {
      book.bookName = bookName
      book.author = author
      book.price = price
      book.date = date
     
      const updatedBook = await book.save()
      res.json(updatedBook)
    } else {
      res.status(404)
      throw new Error('Book not found')
    }
  })
  
  
  
  
  
  export {
    getBookByName,
    deleteBook,
    createBook,
    updateBook,
  }
  