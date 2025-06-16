# Blogging RESTful API

A simple blogging RESTful API built with **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**. This project allows you to manage users and their blog posts through a structured backend system.

---

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **UUID** for unique identifiers


---

## 📌 Project Features

- User creation and management
- Blog post creation, update, deletion
- Relational structure: one user can have many blog posts
- Soft deletion for users (optional)
- Clean RESTful endpoints

---

## 📚 API Endpoints

### 🧑‍💻 Users

#### `GET /users`
- **Description:** Retrieve all users
- **Sample Response:**
```json
[
  {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "Doe",
    "emailAddress": "jane@example.com",
    "userName": "janedoe"
  }
]


```
Sample response to retrieve user by ID...This will includwe their blog posts
```json
{
  "id": "uuid",
  "firstName": "Jane",
  "lastName": "Doe",
  "emailAddress": "jane@example.com",
  "userName": "janedoe",
  "post": [
    {
      "postId": "uuid",
      "title": "My First Post",
      "content": "Hello world...",
      "createdAt": "2024-06-01T12:00:00Z"
    }
  ]
}

```
Sample model creation

```json
    model user {
      id           String  @id @map("userId") @default(uuid())
      firstName    String  @map("firstName")
      lastName     String  @map("lastName")
      emailAddress String  @unique @map("emailAdress")
      userName     String  @unique @map("userName")
      post         posts[]
    }
    
    model posts {
      postId      String   @id @default(uuid()) @map("postId")
      title       String   @map("post_title")
      content     String   @map("post_content")
      createdAt   DateTime @default(now()) @map("createdAt")
      lastUpdated DateTime @updatedAt @map("lastUpdated")
      isDeleted   Boolean  @default(false)
      userid      String
      user        user     @relation(fields: [userid], references: [id], onDelete: Cascade)
}
```

Sample POST request to crete a post 
```json
{
  "title": "My First Post",
  "content": "This is my first blog post.",
  "userid": "uuid"
}
```
