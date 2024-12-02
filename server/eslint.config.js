const prettier = require('eslint-plugin-prettier')
const recommended = require('eslint-plugin-prettier/recommended')

module.exports = [
  {
    files: ['**/*.js'],
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'client/**',
      'build/**',
      '*.config.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    rules: {
      ...recommended.rules,
      'prettier/prettier': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      eqeqeq: 'error',
      curly: ['error', 'all'],
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'never',
          exports: 'never',
          functions: 'never',
        },
      ],
      'arrow-parens': ['error', 'as-needed'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'global-require': 'error',
      'callback-return': 'error',
      'handle-callback-err': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-return-await': 'error',
    },
  },
]
