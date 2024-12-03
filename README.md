# Bloglist - CI/CD

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/douglasdotv/bloglist-ci-cd/blob/main/README.md) [![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/douglasdotv/bloglist-ci-cd/blob/main/README.pt-br.md)

This repository is a solution to [Full Stack Open Part 11](https://fullstackopen.com/en/part11) exercises 11.20–11.21, where an existing application (_Bloglist_) was used as a base for implementing CI/CD practices.

The implementation includes a GitHub Actions workflow that:

- Validates code through linting, unit tests, and end-to-end tests during pull requests and merges to the main branch.
- Handles deployment to Fly.io after a successful merge to the main branch.

Additionally, the main branch is protected, requiring code review before merging.

The application is deployed at [bloglist-ci-cd-weathered-sun-4591.fly.dev](https://bloglist-ci-cd-weathered-sun-4591.fly.dev/). A test account is available, with username `testuser` and password `testpassword`.
