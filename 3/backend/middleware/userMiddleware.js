import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const BDnumber=(req,res,next)=>{
  const phone = req.body.phone;
  var pattern = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
  if (pattern.test(phone)) {
     next()
  }else{
      res.status(401)
  throw new Error('This is not a bangladeshi phone nunber')
  }
}

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const librarian = (req, res, next) => {
  if (req.user && req.user.isLibrarian) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an librarian')
  }
}

export { BDnumber,protect, librarian }
