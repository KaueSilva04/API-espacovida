<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=API%20Espaço%20Vida&fontSize=80&fontColor=fff&animation=fadeIn&fontAlignY=35&desc=NGO%20Management%20System%20API&descAlignY=55&descSize=20" width="100%"/>
</div>

<div align="center">
  
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
  
</div>
<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 📋 Overview

**API Espaço Vida** is a refactored web system for the NGO Espaço Vida, designed to optimize code quality, improve performance, and simplify maintenance. The platform streamlines the management of beneficiaries, events, volunteers, and social actions through a robust REST API architecture.

<br/>

## ✨ Key Features

<div align="center">
  
  <table>
    <tr>
      <td align="center" width="25%">
        <img src="https://img.icons8.com/fluency/96/000000/conference-call.png" width="60"/>
        <br/><b>Beneficiary Management</b>
        <br/><sub>Complete CRUD operations</sub>
      </td>
      <td align="center" width="25%">
        <img src="https://img.icons8.com/fluency/96/000000/calendar.png" width="60"/>
        <br/><b>Event Coordination</b>
        <br/><sub>Schedule & track activities</sub>
      </td>
      <td align="center" width="25%">
        <img src="https://img.icons8.com/fluency/96/000000/helping-hand.png" width="60"/>
        <br/><b>Volunteer Registry</b>
        <br/><sub>Manage volunteer data</sub>
      </td>
      <td align="center" width="25%">
        <img src="https://img.icons8.com/fluency/96/000000/security-checked.png" width="60"/>
        <br/><b>Secure Authentication</b>
        <br/><sub>JWT + bcrypt protection</sub>
      </td>
    </tr>
  </table>
  
</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 🛠️ Tech Stack

<div align="center">

### Backend Framework
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

### Database & ORM
![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Security & Authentication
![bcrypt](https://img.shields.io/badge/bcrypt-6.0.0-7B2CBF?style=for-the-badge&logo=letsencrypt&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Environment
![dotenv](https://img.shields.io/badge/dotenv-17.2.3-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 🏗️ Architecture

<div align="center">
## 🏗️ Architecture

<div align="center">

graph LR
A[Client] -->|HTTP Request| B[Express Router]
B --> C[Controllers]
C --> D[Services/Business Logic]
D --> E[Prisma ORM]
E --> F[Database]
C --> G[JWT Middleware]
G --> H[bcrypt Auth]

text

</div>

<br/>

### Project Structure

API-espacovida/
├── 📁 controllers/ # Request handlers
├── 📁 routes/ # API endpoints
├── 📁 middlewares/ # Auth & validation
├── 📁 prisma/ # Database schema & migrations
├── 📁 services/ # Business logic layer
├── 📁 utils/ # Helper functions
├── 📄 server.js # Application entry point
└── 📄 .env # Environment variables

text

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 🚀 Getting Started

### Prerequisites

Node.js >= 16.x
npm or yarn
PostgreSQL/MySQL database

text

### Installation

1. **Clone the repository**
git clone https://github.com/KaueSilva04/API-espacovida.git
cd API-espacovida

text

2. **Install dependencies**
npm install

text

3. **Configure environment variables**
Create .env file
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret_key"
PORT=3000

text

4. **Run Prisma migrations**
npx prisma migrate dev
npx prisma generate

text

5. **Start development server**
npm run dev

text

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 📡 API Endpoints

<div align="center">

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Create new user account | ❌ |
| `POST` | `/api/auth/login` | User authentication | ❌ |
| `GET` | `/api/beneficiaries` | List all beneficiaries | ✅ |
| `POST` | `/api/beneficiaries` | Create beneficiary | ✅ |
| `PUT` | `/api/beneficiaries/:id` | Update beneficiary | ✅ |
| `DELETE` | `/api/beneficiaries/:id` | Remove beneficiary | ✅ |
| `GET` | `/api/events` | List all events | ✅ |
| `POST` | `/api/events` | Create new event | ✅ |
| `GET` | `/api/volunteers` | List volunteers | ✅ |
| `POST` | `/api/volunteers` | Register volunteer | ✅ |

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 🔐 Security Features

<div align="center">

| Feature | Implementation |
|---------|---------------|
| **Password Hashing** | bcrypt with salt rounds |
| **Token Authentication** | JWT (JSON Web Tokens) |
| **Environment Variables** | Sensitive data protected via dotenv |
| **Input Validation** | Request sanitization & validation |
| **CORS Protection** | Controlled cross-origin requests |

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 🎯 Refactoring Improvements

<div align="center">

// Clean Architecture Principles Applied

✅ Separation of Concerns
✅ Modular Code Structure
✅ Dependency Injection
✅ Error Handling Middleware
✅ Database Connection Pooling
✅ Async/Await Best Practices

text

</div>

<br/>

## 📊 Performance Optimizations

- **Prisma Query Optimization**: Efficient database queries with select/include
- **Connection Pooling**: Optimized database connections
- **Async Operations**: Non-blocking I/O for better throughput
- **Middleware Caching**: Reduced redundant processing
- **Environment-based Configs**: Different settings for dev/prod

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<br/>

## 📝 License

This project is licensed under the **ISC License**.

<br/>

## 👥 Team

<div align="center">
  
  [![GitHub](https://img.shields.io/badge/GitHub-KaueSilva04-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KaueSilva04)
  
</div>

<br/>

## 🌟 Support the Project

If this project helped you, please consider giving it a ⭐!

<br/>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=fadeIn" width="100%"/>
</div>
