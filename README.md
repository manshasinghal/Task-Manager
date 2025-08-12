# Task Manager - Dockerized Full Stack Application

A complete task management application built with React, Node.js, Express, and MongoDB, fully containerized with Docker.

## 🚀 Quick Start

### Option 1: Run with Docker Compose (Recommended)

1. **Download the docker-compose file:**
   ```bash
   curl -o docker-compose.yml https://raw.githubusercontent.com/tushhh/taskmanager/main/docker-compose.prod.yml
   ```

2. **Start the application:**
   ```bash
   docker compose up -d
   ```

3. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)
   - Health Check: [http://localhost:4000/health](http://localhost:4000/health)

### Option 2: Pull Images Manually

```bash
# Pull the images
docker pull tushhh/taskmanager-backend:latest
docker pull tushhh/taskmanager-frontend:latest
docker pull mongo:7

# Create a network
docker network create taskmanager-network

# Run MongoDB
docker run -d --name taskmanager-mongo \
  --network taskmanager-network \
  -v mongo_data:/data/db \
  mongo:7

# Run Backend
docker run -d --name taskmanager-backend \
  --network taskmanager-network \
  -p 4000:5000 \
  -e MONGO_URI=mongodb://taskmanager-mongo:27017/tasks \
  -e PORT=5000 \
  -e NODE_ENV=production \
  tushhh/taskmanager-backend:latest

# Run Frontend
docker run -d --name taskmanager-frontend \
  --network taskmanager-network \
  -p 3000:3000 \
  -e REACT_APP_API_BASE_URL=http://localhost:4000 \
  -e NODE_ENV=production \
  tushhh/taskmanager-frontend:latest
```

## 📱 Features

- ✅ **User Authentication** - Signup and Login
- ✅ **Task Management** - Create, Read, Update, Delete tasks
- ✅ **Real-time UI** - Responsive React frontend
- ✅ **RESTful API** - Express.js backend
- ✅ **Database** - MongoDB with persistent storage
- ✅ **Containerized** - Fully Dockerized application
- ✅ **Production Ready** - Optimized for deployment

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Authentication:** JWT (JSON Web Tokens)

## 🔧 Development

### Prerequisites
- Docker and Docker Compose
- Git (optional, for cloning source code)

### Environment Variables

The application uses these environment variables:

**Backend:**
- `MONGO_URI` - MongoDB connection string
- `PORT` - Backend server port (default: 5000)
- `NODE_ENV` - Environment mode

**Frontend:**
- `REACT_APP_API_BASE_URL` - Backend API URL
- `PORT` - Frontend server port (default: 3000)
- `NODE_ENV` - Environment mode

### Port Configuration

- **Frontend:** Port 3000
- **Backend:** Port 4000 (maps to container port 5000)
- **MongoDB:** Port 27017

## 📋 Management Commands

```bash
# Start the application
docker compose up -d

# View logs
docker compose logs -f

# Stop the application
docker compose down

# Remove everything including data
docker compose down -v

# Update to latest images
docker compose pull
docker compose up -d

# Check container status
docker compose ps
```

## 🔍 Troubleshooting

### Common Issues:

1. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :4000
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Connection issues:**
   ```bash
   # Check if all containers are running
   docker compose ps
   
   # Check logs for errors
   docker compose logs backend
   docker compose logs frontend
   ```

3. **Database connection problems:**
   ```bash
   # Restart MongoDB container
   docker compose restart mongo
   
   # Check MongoDB logs
   docker compose logs mongo
   ```

## 🌐 Docker Hub Images

- **Backend:** [tushhh/taskmanager-backend](https://hub.docker.com/r/tushhh/taskmanager-backend)
- **Frontend:** [tushhh/taskmanager-frontend](https://hub.docker.com/r/tushhh/taskmanager-frontend)

## 📊 API Endpoints

- `GET /health` - Health check
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you encounter any issues:

1. Check the troubleshooting section above
2. View container logs: `docker compose logs`
3. Create an issue on GitHub
4. Contact: [your-email@example.com]

---

**Enjoy managing your tasks! 🎉**