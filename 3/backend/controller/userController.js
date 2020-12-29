import User from '../model/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { phone, password } = req.body
  
    const user = await User.findOne({ phone })
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        isLibrarian: user.isLibrarian,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid phone or password')
    }
  })
      
  // @desc    Register a new user
  // @route   POST /api/users
  // @access  Public
  const registerUser = asyncHandler(async (req, res) => {
    const { name, phone,isLibrarian, password } = req.body
    
  
    const userExists = await User.findOne({ phone })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    if(password.length<6){
      res.status(400)
      throw new Error('Password must be more then 6 digits')
    }
  
    const user = await User.create({
      name,
      phone,
      isLibrarian,
      password
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        isLibrarian:user.isLibrarian,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })


  // @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
     const phone= req.params.phone
      
     if(req.user.isLibrarian){
      var singleUser = await User.findOne( {$and: [{phone}, {isVisible: true}]})
     }else{
      singleUser = await User.findOne( { $and: [ { phone }, { isLibrarian: false  }, {isVisible:true} ] } )
     }
    
  
    if (singleUser) {
      res.json({
        _id: singleUser._id,
        name: singleUser.name,
        phone: singleUser.phone,
        isLibrarian: singleUser.isLibrarian,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })


  const updateUserProfile=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.user._id);
    if(user){
        user.name= req.body.name || user.name
        user.phone=req.body.phone || user.phone
        user.isLibrarian=req.body.isLibrarian || user.isLibrarian
        const updatedUser=await user.save();
        res.json({ 
            _id: updatedUser._id,
            name: updatedUser.name,
            phone: updatedUser.phone,
            isLibrarian: updatedUser.isLibrarian,
            token: generateToken(updatedUser._id),
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }

  })



  
  // @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
  const deleteUser=asyncHandler(async(req,res)=>{
      const user= await User.findById(req.params.id)
      if(user){
        user.isVisible=false;
        user.save();
          res.json({
              message:'user Removed'
          })
      }else{
        res.status(404)
        throw new Error('User not found')
      }
  })

  

export {authUser,registerUser,getUserProfile,updateUserProfile,deleteUser}