# 🧠 Note Recall - AI-Powered Note Companion

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)

> Transform your conversations into intelligent notes. Chat with AI, capture insights, and never lose important information again.

## ✨ Features

### 🤖 **AI-Powered Intelligence**

- **Advanced AI Chat Interface** - Context-aware conversations with state-of-the-art language models
- **Smart Note Generation** - Automatically extract key points, summaries, and actionable items
- **Intelligent Recall** - AI remembers context and helps you find relevant information
- **Flexible AI Models** - Choose from any OpenAI model (GPT-4, GPT-3.5-turbo, etc.) or easily integrate other AI providers

### 📝 **Smart Note Management**

- **Automatic Note Creation** - Generate notes from conversations automatically
- **Conversation History** - Keep track of all your AI conversations
- **Note Organization** - View and manage your generated notes

### 🔒 **Security & Privacy**

- **Secure Authentication** - Password hashing and JWT-based sessions
- **User Isolation** - Data separation between users
- **Database Security** - PostgreSQL with access controls

### ⚡ **Performance & UX**

- **Lightning Fast** - Built with modern technology for instant responses
- **Beautiful Interface** - Intuitive design that works for everyone
- **Real-time Updates** - Live conversation updates and notifications

### 🚀 **Developer Experience**

- **TypeScript First** - Full type safety and better development experience
- **Modern Stack** - Next.js 13+, Prisma, PostgreSQL
- **Docker Ready** - Easy deployment and development setup

## 🏗️ Architecture

```bash
┌─────────────────┐    ┌─────────────────┐  
│   Next.js App   │    │   PostgreSQL    │    
│   (Frontend)    │◄──►│   (Database)    │   
│   + API         │    │                 │ 
└─────────────────┘    └─────────────────┘    
         │
         ▼
┌─────────────────┐
│   OpenAI API    │
│  (AI Services)  │
└─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/hossamAbubakr/note-recall.git
cd note-recall
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.template .env

# Edit with your configuration
nano .env  # or use your favorite editor
```

**Required Environment Variables:**

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/note_recall"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# OpenAI (for AI features)
OPENAI_API_KEY="your-openai-api-key"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app! 🎉

## 🐳 Docker Deployment

### Quick Docker Setup

```bash
# Start everything with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Build and start production containers
NODE_ENV=production docker-compose up -d --build

# Scale if needed
docker-compose up -d --scale app=3
```

### Development with Docker

```bash
# Create .env for development
NODE_ENV=development
APP_VOLUME=.:/app
APP_COMMAND=npm run dev

# Start with hot reloading
docker-compose up -d
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Project Structure

```bash
note-recall/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── chat/              # Chat interface
│   └── notes/             # Notes management
├── components/             # Reusable components
│   ├── Auth/              # Authentication components
│   ├── Chat/              # Chat interface components
│   ├── Notes/             # Notes components
│   └── HomePage/          # Landing page components
├── lib/                    # Utility libraries
│   ├── ai/                # AI integration
│   ├── prisma.ts          # Database client
│   └── hooks/             # Custom React hooks
├── prisma/                 # Database schema & migrations
├── public/                 # Static assets
└── docker-compose.yml      # Docker orchestration
```

### Database Schema

The application uses Prisma with PostgreSQL for:

- **Users** - Authentication and user management
- **Conversations** - Chat sessions and metadata
- **Messages** - Individual chat messages
- **Notes** - Generated notes from conversations
- **Sessions** - User session management

## 🔧 Configuration

### Authentication Configuration

Configure authentication in your `.env`:

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"
```

### AI Configuration

```env
# OpenAI
OPENAI_API_KEY="your-api-key"
OPENAI_MODEL="gpt-4"  # or gpt-3.5-turbo

# Custom AI Provider
CUSTOM_AI_ENDPOINT="https://your-ai-provider.com/api"
CUSTOM_AI_KEY="your-api-key"
```

### Database Configuration

```env
# PostgreSQL
DATABASE_URL="postgresql://user:password@host:port/database"

# Connection Pool
DATABASE_POOL_SIZE=10
DATABASE_POOL_TIMEOUT=20
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker Production

```bash
# Build production image
docker build -t note-recall:latest .

# Run with environment variables
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  note-recall:latest
```

### Kubernetes

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -l app=note-recall
```

## 📊 Monitoring & Logging

### Health Checks

- **Application**: `GET /api/health`
- **Database**: Automatic PostgreSQL health checks
- **Redis**: Automatic Redis health checks

### Logging

```bash
# View application logs
docker-compose logs -f app

# View database logs
docker-compose logs -f postgres

# View Redis logs
docker-compose logs -f redis
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License

### **Star this repo if it helped you! ⭐**  
