const { test, expect } = require('@playwright/test')
const { login } = require('./helper')

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Douglas Vieira',
        username: 'douglas',
        password: '123456',
      },
    })
    await page.goto('/')
  })

  test('Should display login form by default', async ({ page }) => {
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  test('Should succeed with correct credentials', async ({ page }) => {
    await login(page, 'douglas', '123456')
    await expect(page.getByText('Welcome back, Douglas Vieira!')).toBeVisible()
  })

  test('Should fail with wrong credentials', async ({ page }) => {
    await login(page, 'douglas', 'wrongpassword')
    await expect(page.getByRole('alert')).toContainText(
      'Invalid username or password'
    )
    await expect(
      page.getByText('Welcome back, Douglas Vieira!')
    ).not.toBeVisible()
  })

  test('Should create a new blog', async ({ page }) => {
    await login(page, 'douglas', '123456')
    await page.getByRole('button', { name: 'New blog' }).click()

    const title = 'New Blog Title'
    const author = 'Douglas Vieira'
    const url = 'http://newblog.com'

    await page.getByLabel('Title').fill(title)
    await page.getByLabel('Author').fill(author)
    await page.getByLabel('URL').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByText(title)).toBeVisible()
    await expect(page.getByText(author)).toBeVisible()
  })
})
