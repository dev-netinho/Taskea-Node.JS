# ✅ Gerenciador de Tarefas com Autenticação JWT, Node.js, Express, Sequelize e SQLite

Este projeto é uma **API RESTful completa** de um sistema de gerenciamento de tarefas com autenticação segura via **JWT**. Desenvolvido com **Node.js**, **Express**, **Sequelize** e **SQLite**, o sistema permite que usuários possam **se registrar, fazer login e gerenciar suas tarefas de forma segura**, com rotas protegidas e criptografia de senha com **bcrypt**.

O projeto segue boas práticas de desenvolvimento com **estrutura em camadas (MVC)**, banco de dados relacional com **relacionamento entre usuários e tarefas**, e foi criado com fins educacionais para aprofundar o domínio de backend moderno e segurança em APIs.

---

## 🚀 Funcionalidades

- Registro e login de usuários com senha criptografada (`bcrypt`)
- Autenticação via `JWT` com expiração de 1h
- Middleware de autenticação protegendo rotas privadas
- CRUD completo de tarefas
- Associação direta entre usuários e tarefas
- Banco de dados SQLite com Sequelize ORM
- Estrutura de projeto modularizada por responsabilidade

---

## 🧠 Tecnologias Utilizadas

- Node.js
- Express
- Sequelize ORM
- SQLite
- JWT
- Bcrypt
- Nodemon (ambiente de dev)
- UUID (instalado, mas ainda não utilizado)

---

## 🧱 Estrutura de Pastas

```
📁 raiz
├── index.js                # Ponto de entrada do app
├── package.json            # Dependências e scripts
├── /data
│   └── tarefas.db          # Banco de dados SQLite
├── /config
│   ├── index.js            # Inicializa os modelos e o DB
│   └── /database
│       └── database.js     # Configuração do Sequelize
├── /controllers
│   ├── authController.js   # Lógica de login e registro
│   └── tarefaController.js # CRUD de tarefas
├── /middlewares
│   └── authMiddleware.js   # Middleware para validar JWT
├── /models
│   ├── Usuario.js          # Modelo de usuário
│   └── Tarefa.js           # Modelo de tarefa
├── /routes
│   ├── auth.js             # Rotas de autenticação
│   └── tarefas.js          # Rotas de tarefas
```

---

## 🛠️ Como Executar

1. Clone o projeto:

```bash
git clone https://github.com/MenesesLuiz/task-manager.git
cd task-manager
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor (modo desenvolvimento):

```bash
npm run dev
```

O servidor estará disponível em:  
🔗 `http://localhost:8080`

---

## 🔐 Autenticação JWT

As rotas de tarefas exigem um **token JWT** válido. Após o login, envie o token no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📬 Endpoints da API

### 🔹 Registrar novo usuário

**POST** `/auth/registrar`

**Corpo da requisição:**

```json
{
  "nome": "Luiz",
  "email": "luiz@email.com",
  "senha": "senha123"
}
```

---

### 🔹 Login de usuário

**POST** `/auth/login`

**Corpo da requisição:**

```json
{
  "email": "luiz@email.com",
  "senha": "senha123"
}
```

**Resposta:**

```json
{
  "mensagem": "Login realizado com sucesso",
  "token": "Token disponível aqui"
}
```

---

### 🔹 Criar tarefa (protegido)

**POST** `/tarefas`

**Headers:**

```
Authorization: Bearer Seu_Token_Aqui
```

**Body:**

```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Aprender sobre middleware e JWT",
  "usuario_id": 1
}
```

---

### 🔹 Listar tarefas do usuário

**GET** `/tarefas`

**Headers:**

```
Authorization: Bearer Seu_Token_Aqui
```

---

### 🔹 Atualizar tarefa

**PUT** `/tarefas/:id`

**Headers:**

```
Authorization: Bearer Seu_Token_Aqui
```

**Body:**

```json
{
  "titulo": "Estudar Sequelize",
  "descricao": "Modelagem de tabelas",
  "status": "em andamento"
}
```

---

### 🔹 Deletar tarefa

**DELETE** `/tarefas/:id`

**Headers:**

```
Authorization: Bearer Seu_Token_Aqui
```

---

## 📟 Exemplos com CURL

### Registrar

```bash
curl -X POST http://localhost:8080/auth/registrar \
-H "Content-Type: application/json" \
-d '{"nome":"Joao","email":"joao@email.com","senha":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"joao@email.com","senha":"123456"}'
```

### Criar Tarefa

```bash
curl -X POST http://localhost:8080/tarefas \
-H "Authorization: Bearer Seu_Token_Aqui" \
-H "Content-Type: application/json" \
-d '{"titulo":"Aprender Sequelize","descricao":"Estudo de models","usuario_id":1}'
```

---

## 🚧 Melhorias Futuras

- Validação com Joi/Yup
- Refresh Token
- Upload de arquivos nas tarefas
- Integração com frontend (React ou Vue)
- Testes automatizados (Jest)
- Deploy em ambiente cloud (Render, Railway, Vercel)

---

## 👨‍💻 Autores

**Luiz Felipe Meneses**  
Estudante de Engenharia de Software | Backend e Cibersegurança  

- LinkedIn: [linkedin.com/in/menesesluizf(https://www.linkedin.com/in/menesesluizf)  
- Email: menesesluizf@gmail.com

**Lucas Henrique**
Estudante de Engenharia de Software | Backend

- LinkedIn: [https://www.linkedin.com/in/lucas-henrique-osouza/(https://www.linkedin.com/in/lucas-henrique-osouza/)

---

## 📝 Licença

Este projeto está sob a licença MIT.  
Sinta-se livre para usar, estudar, modificar e contribuir.

---

> “A prática constante constrói a maestria.”  
> Projeto desenvolvido com dedicação para aprofundar habilidades reais em backend e segurança. 🚀
