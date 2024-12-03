# Bloglist - CI/CD

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/douglasdotv/bloglist-ci-cd/blob/main/README.md) [![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/douglasdotv/bloglist-ci-cd/blob/main/README.pt-br.md)

Este repositório contém uma solução para os exercícios 11.20–11.21 da [Parte 11 do Full Stack Open](https://fullstackopen.com/en/part11), onde práticas de CI/CD foram implementadas usando como base uma aplicação existente (_Bloglist_).

A implementação inclui um workflow do GitHub Actions que:

- Valida o código por meio de linting, testes unitários e testes end-to-end durante pull requests e merges para a branch main
- Realiza o deploy para o Fly.io depois de um merge bem-sucedido para a branch main

Além disso, a branch main está protegida, exigindo code review antes do merge.

A aplicação está disponível em [bloglist-ci-cd-weathered-sun-4591.fly.dev](https://bloglist-ci-cd-weathered-sun-4591.fly.dev/). Uma conta de teste está disponível, com username `testuser` e senha `testpassword`.
