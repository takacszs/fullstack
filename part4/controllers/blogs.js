const Blog = require("../models/blog.js")
const blogsRouter = require("express").Router()
const User = require('../models/user')

// 4.17
blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  })

// 4.17
blogsRouter.post("/", async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).json({
      error: 'title or url is missing',
    })
  }
  else {
    // for now it will assign the first user it finds
    const user = await User.findOne({});
    console.log('user :>> ', user);
      const blog = new Blog( {
        title: request.body.title,
        author: request.body.author === undefined ? '' : request.body.author,
        url: request.body.url,
        likes: request.body.likes === undefined ? 0 : request.body.likes,
        user: user._id
      })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id.toString())
    // user object also changes!!
    await user.save()
    response.status(201).json(savedBlog)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  if (blog.likes<0) response.status(404).end()

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)

    if (deletedBlog) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter
