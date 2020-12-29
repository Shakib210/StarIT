import mongoose from 'mongoose'



const bookSchema=mongoose.Schema(
    {
      bookName: { type: String, required: true },
      price: { type: Number, required: true },
      author: { type: String, required: true },
      date: {type: Date, required:true,default:Date.now()},
      isVisible:{type:Boolean, required:true, default:true}
    },
    {
        timestamps:true,
    }
)

const Book =mongoose.model('books',bookSchema);
export default Book;