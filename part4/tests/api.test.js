const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: 'nice blog 1',
    author: 'Author Arthur',
    url: 'https://www.example.com/',
    likes: 4,
  },
  {
    title: 'nice blog 2',
    author: 'Author Arthur',
    url: 'https://www.example.com/',
    likes: 8,
  },
  {
    title: 'nice blog 3',
    author: 'Author Arthur',
    url: 'https://www.example.com/',
    likes: 1,
  },
  {
    title: 'nice blog 4',
    author: 'Author Aaron',
    url: 'https://www.example.com/',
    likes: 9,
  },
  {
    title: 'nice blog 5',
    author: 'Author Arthur',
    url: 'https://www.example.com/',
    likes: 1,
  },
  {
    title: 'nice blog 6',
    author: 'Author Arnold',
    url: 'https://www.example.com/',
    likes: 10,
  },

]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((note) => note.toJSON())
}

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

// 4.8
describe('with initial blogs saved ', () => {
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

// 4.9
test('the unique identifier property of the blog posts is named id ', async () => {
  const response = await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  for (let blog of response.body) {
    expect(blog._id).toBeDefined()
  }
})

})

// 4.10
describe('blog addition', () => {
test('new valid blog can be created', async () => {
const blogToAdd = {
  title: 'New Book',
  author: 'Author Arrabiata',
  url: 'https://www.example.com',
  likes: 99,
}

await api
  .post('/api/blogs')
  .send(blogToAdd)
  .expect(201)
  .expect('Content-Type', /application\/json/)

const blogs = await blogsInDb()
expect(blogs).toHaveLength(initialBlogs.length + 1)
})

// 4.11
test('blog with no likes default to 0', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'ABC CDE',
    url: 'https://www.google.com/',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

// 4.12
test('blog with no url returns with 400', async () => {
  const newBlog = {
    title: 'new blog no url',
    author: 'ABC CDE no url',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    // blog list length stays the same
    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(initialBlogs.length)
})

/4.12
test('blog with no title returns with 400', async () => {
  const newBlog = {
    author: 'ABC CDE no url',
    url: 'url.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    // blog list length stays the same
    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(initialBlogs.length)
})


})

describe('blog deletion', () => {
// 4.13
test('single blog post can be deleted', async () => {
  const blogToDel = {
    title: 'New Book',
    author: 'Author Arrabiata',
    url: 'https://www.example.com',
    likes: 11,
  }

  const response = await api
    .post('/api/blogs')
    .send(blogToDel)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const idOfBlogToDel = response.body._id

  await api
    .delete(`/api/blogs/${idOfBlogToDel}`)
    .expect(204)

  const blogs = await blogsInDb()
  expect(blogs).toHaveLength(initialBlogs.length)

  const contents = blogs.map((r) => r._id)
  expect(contents).not.toContain(blogToDel._id)
})
})

// 4.14
describe('blog update', () => {
  test('update a blog with valid params succeeds', async () => {
    const blogsBefore = await blogsInDb()

    const blogToUpdate = blogsBefore[0]
    blogToUpdate.likes = 666

    const id = blogToUpdate._id.toString()

    await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()

    const blog = blogsAfter.find((blog) => blog._id.toString() === id)
    expect(blog.likes).toBe(666)
  })

  test('update a blog with invalid likes fails with 404', async () => {
    const blogsBefore = await blogsInDb()

    const blogToUpdate = blogsBefore[0]
    blogToUpdate.likes = -99999

    const id = blogToUpdate._id.toString()

    await api
    .put(`/api/blogs/${id}`)
    .send(blogToUpdate)
    .expect(404)

  })
})

afterAll(async () => {
    await mongoose.connection.close()
  })