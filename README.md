# 📝 Task Manager

A full-stack Task Manager web application built with **React** and **Spring Boot**, developed as an academic project.

## 📖 About
Task Manager is a productivity app that helps you stay on top of your daily tasks and to-dos. Users can sign up and log in securely, and once authenticated, they get a personal dashboard where they can add new tasks, edit existing ones, mark them as complete, or delete them. Every task belongs to the logged-in user, so your to-do list is always private and synced. Whether you're tracking assignments, work tasks, or personal goals — this app keeps everything organized in one place.


## 📌 Features
- 🔐 User authentication (Login / Register)
- ✅ Create, edit, and delete tasks
- 📋 Mark tasks as complete or pending
- 🏷️ Set task priority (Low, Medium, High)
- 🔍 Filter and search tasks
- 📱 Responsive UI

## 🛠️ Tech Stack

**Frontend:**
- React.js
- CSS / Tailwind (update as needed)
- Axios (for API calls)

**Backend:**
- Java Spring Boot
- REST API
- MySQL / PostgreSQL (update as needed)

## ⚙️ Getting Started

### Prerequisites
- Node.js
- Java 17+
- Maven
- MySQL / PostgreSQL

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```

### Environment Variables
Create an `application.properties` file in `src/main/resources/`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 📂 Project Structure
```
task-manager/
├── frontend/        # React app
│   └── src/
├── backend/         # Spring Boot app
│   └── src/
└── README.md
```


## 📄 License
This project is for academic purposes.
