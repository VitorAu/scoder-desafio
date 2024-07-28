<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Desafio scoder</h1>
</div>


<!-- ABOUT THE PROJECT -->
### Tecnologias Utilizadas

Esta seção lista as principais tecnologias e frameworks usados para iniciar o projeto. Aqui estão os utilizados:

* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
* ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)


## Getting Started

Este guia fornece instruções sobre como configurar e executar o projeto localmente. Para obter uma cópia local e colocá-la em funcionamento, siga estes passos simples.

### Prerequisites

Para executar este projeto, você precisará dos seguintes itens:

* Node.js
* npm ou yarn
* Git

### Installation

Siga os passos abaixo para instalar e configurar o aplicativo. Este projeto requer a configuração do ambiente para o frontend e backend.
1. **Clone o repositório**
   ```sh
   git clone https://github.com/VitorAu/scoder-desafio.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd scoder-desafio
   ```
3. Navegue até o diretório do frontend:
   ```sh
   cd frontend
   ```
4. Instale as dependências:
   ```sh
   npm i
   ```
5. Inicie o servidor frontend:
   ```sh
   npm run dev
   ```
6. Navegue até o diretório do backend:
   ```sh
   cd ../backend
   ```
7. Instale as dependências:
   ```sh
   npm i
   ```
8. Crie um arquivo .env na raiz do diretório backend com base no arquivo .env.example:
   ```sh
   cp .env.example .env
   ```
9. Execute as Migrations do Prisma:
   ```sh
   npx prisma migrate deploy
   ```
10. Gere o Cliente do Prisma:
   ```sh
   npx prisma generate
   ```
11. Inicie o servidor backend:
   ```sh
   npm run dev
   ```
