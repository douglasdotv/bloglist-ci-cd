const { defineConfig } = require('@playwright/test')

const PORT = process.env.PORT || 3003
const BASE_URL = `http://localhost:${PORT}`

module.exports = defineConfig({
  testDir: './tests',
  webServer: {
    command: 'cd ../../server && npm run start:test',
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: BASE_URL,
    browserName: 'chromium',
    headless: true,
  },
})
