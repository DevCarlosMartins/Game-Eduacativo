
# Documentação da API - Matemática em ação

## Visão Geral
Esta API gerencia entidades relacionadas ao jogo de matemática, permitindo operações de CRUD (Criar, Ler, Atualizar e Deletar) para **Usuários**, **Quests (Perguntas)** e **Answers (Respostas)**.

---

## Estrutura de Endpoints

### 1. Usuários (`/users`)
Gerencia os dados dos usuários do sistema.

#### **GET /users**
Retorna a lista de todos os usuários.

#### **GET /users/{id}**
Retorna os dados de um usuário específico.

#### **POST /users**
Cria um novo usuário.
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

#### **DELETE /users/{id}**
Remove um usuário existente.

---

### 2. Quests (`/quests`)
Gerencia as perguntas do jogo.

#### **GET /quests**
Retorna todas as quests cadastradas.

#### **GET /quests/{id}**
Busca uma quest específica pelo ID.

#### **POST /quests**
Cria uma nova quest.
```json
{
  "pergunta": "Quanto é 5 + 7?",
  "id_Repost": 1
}
```

#### **DELETE /quests/{id}**
Remove uma quest específica.

---

### 3. Answers (`/answers`)
Gerencia as respostas das quests.

#### **GET /answers**
Lista todas as respostas disponíveis.

#### **GET /answers/{id}**
Busca uma resposta específica.

#### **POST /answers**
Cria uma nova resposta.
```json
{
  "idQuest": 1,
  "desc": "12"
}
```

#### **DELETE /answers/{id}**
Exclui uma resposta existente.

---

## Estrutura dos Modelos

### **UserModel**
| Campo | Tipo | Descrição |
|--------|------|-----------|
| `id` | Long | Identificador do usuário |
| `nome` | String | Nome do usuário |
| `email` | String | E-mail do usuário |
| `senha` | String | Senha criptografada |

### **QuestModel**
| Campo | Tipo | Descrição |
|--------|------|-----------|
| `id` | Long | Identificador da questão |
| `pergunta` | String | Enunciado da questão |
| `id_Repost` | int | ID da resposta correta |

### **AnswersModel**
| Campo | Tipo | Descrição |
|--------|------|-----------|
| `id` | Long | Identificador da resposta |
| `idQuest` | int | ID da questão associada |
| `desc` | String | Texto da resposta |

---

## Estrutura de Pastas (src/main/java/com/game_matematica/game_matematica)
```
├── control
│   ├── UserControl.java
│   ├── QuestControl.java
│   └── AnswersControl.java
│
├── model
│   ├── UserModel.java
│   ├── QuestModel.java
│   └── AnswersModel.java
│
├── repository
│   ├── UserRepository.java
│   ├── QuestRepository.java
│   └── AnswersRepository.java
│
└── service
    ├── UserService.java
    ├── QuestService.java
    └── AnswersService.java
```

---

## Respostas HTTP
| Código | Descrição |
|--------|------------|
| `200 OK` | Operação realizada com sucesso |
| `201 CREATED` | Recurso criado com sucesso |
| `204 NO CONTENT` | Recurso removido com sucesso |
| `404 NOT FOUND` | Recurso não encontrado |

---

## Tecnologias Utilizadas
- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- Jakarta Persistence (JPA)
- Banco de dados relacional (MySQL, PostgreSQL ou H2)
