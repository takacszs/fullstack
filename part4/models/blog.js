const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set("toJSON",{
  transform: (_document, returnedObject) => {
    delete returnedObject.__v
  }    
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog