const { test, describe, beforeEach, after } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
  {
    username: 'john_doe',
    name: 'John Doe',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    name: 'Jane Smith',
    password: 'password456',
  },
]

const createNewUserAndGetToken = async () => {
  const user = {
    username: `user_${Math.random().toString(36).substring(7)}`,
    name: `User ${Math.random().toString(36).substring(7)}`,
    password: 'testpassword',
  }

  await api.post('/api/users').send(user)

  const response = await api.post('/api/login').send({
    username: user.username,
    password: user.password,
  })

  return { token: response.body.token, user }
}

describe('API Tests', () => {
  beforeEach(async () => {
    await api.post('/api/testing/reset')
    const userCreationPromises = initialUsers.map(user =>
      api.post('/api/users').send(user)
    )
    await Promise.all(userCreationPromises)
  })

  after(async () => {
    await mongoose.connection.close()
  })

  test('Should return 404 for accessing a non-existent endpoint', async () => {
    await api.get('/api/api/non-existing').expect(404)
  })

  test('Should return 200 for fetching blogs', async () => {
    await api.get('/api/blogs').expect(200)
  })

  test('Should create a new user and return 201', async () => {
    const newUser = {
      username: 'test_user',
      name: 'Test User',
      password: 'password123',
    }
    await api.post('/api/users').send(newUser).expect(201)
  })

  test('Should return 400 when creating a user with missing username', async () => {
    const invalidUser = {
      name: 'Test User',
      password: 'password123',
    }
    await api.post('/api/users').send(invalidUser).expect(400)
  })

  test('Should return 409 when creating a user with an existing username', async () => {
    const existingUser = {
      username: 'john_doe',
      name: 'Duplicate User',
      password: 'password123',
    }
    await api.post('/api/users').send(existingUser).expect(409)
  })

  test('Should fetch all users with status 200', async () => {
    await api.get('/api/users').expect(200)
  })

  test('Should return 401 when creating a blog without a token', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Test Author',
      url: 'https://test.com',
    }
    await api.post('/api/blogs').send(newBlog).expect(401)
  })

  test('Should create a blog and return 201 with valid token', async () => {
    const { token } = await createNewUserAndGetToken()

    const newBlog = {
      title: 'Authorized Blog',
      author: 'Test Author',
      url: 'https://test.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
  })

  test('Should return 400 when creating a blog with invalid data', async () => {
    const { token } = await createNewUserAndGetToken()

    const invalidBlog = {
      author: 'Test Author',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidBlog)
      .expect(400)
  })

  test('Should delete a blog successfully with valid token', async () => {
    const { token } = await createNewUserAndGetToken()

    const newBlog = {
      title: 'Blog to Delete',
      author: 'Test Author',
      url: 'https://delete-this.com',
    }

    const createdBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogId = createdBlogResponse.body.id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })

  test('Should fail to delete a blog without ownership and return 403', async () => {
    const ownerAuthDetails = await createNewUserAndGetToken()
    const otherAuthDetails = await createNewUserAndGetToken()

    const ownerToken = ownerAuthDetails.token
    const otherToken = otherAuthDetails.token

    const newBlog = {
      title: 'Blog to Fail Delete',
      author: 'Test Author',
      url: 'https://fail-delete.com',
    }

    const createdBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send(newBlog)
      .expect(201)

    const blogId = createdBlogResponse.body.id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(403)
  })

  test('Should update a blog successfully with valid data', async () => {
    const { token } = await createNewUserAndGetToken()

    const newBlog = {
      title: 'Blog to Update',
      author: 'Original Author',
      url: 'https://update-this.com',
    }

    const createdBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogId = createdBlogResponse.body.id

    const updatedBlogData = {
      title: 'Updated Blog Title',
      author: 'Updated Author',
      url: 'https://updated.com',
    }

    const updatedBlogResponse = await api
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlogData)
      .expect(200)

    const updatedBlog = updatedBlogResponse.body
    assert.strictEqual(updatedBlog.title, updatedBlogData.title)
    assert.strictEqual(updatedBlog.author, updatedBlogData.author)
    assert.strictEqual(updatedBlog.url, updatedBlogData.url)
  })

  test('Should fail to update a blog with invalid data', async () => {
    const { token } = await createNewUserAndGetToken()

    const newBlog = {
      title: 'Blog to Fail Update',
      author: 'Original Author',
      url: 'https://fail-update.com',
    }

    const createdBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogId = createdBlogResponse.body.id

    const invalidBlogData = {
      title: '',
      author: 'Updated Author',
      url: '',
    }

    await api
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(invalidBlogData)
      .expect(400)
  })
})
