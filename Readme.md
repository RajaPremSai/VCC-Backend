# GitHub Clone Backend

A robust backend implementation of a GitHub-like version control system with user management, repository handling, and issue tracking capabilities.

## 🚀 Features

- **Version Control Operations**

  - Initialize repositories
  - Stage files
  - Commit changes
  - Push to remote (AWS S3)
  - Pull from remote
  - Revert to previous commits

- **User Management**

  - Authentication & Authorization
  - Profile management
  - Follow other users
  - JWT based security

- **Repository Management**

  - Create/Delete repositories
  - Public/Private visibility
  - Star repositories
  - Manage repository content

- **Issue Tracking**
  - Create/Update/Delete issues
  - Track issue status
  - Link issues to repositories

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Cloud Storage**: AWS S3
- **Authentication**: JWT
- **Real-time**: Socket.IO
- **Version Control**: Custom implementation

## 📚 API Endpoints

### User Management

```http
POST   /signup                    # Create new user account
POST   /login                     # Authenticate user
GET    /allUsers                  # List all users
GET    /userProfile/:id           # Get user profile
PUT    /updateUserProfile/:id     # Update user profile
DELETE /deleteUserProfile/:id     # Delete user account
```

### Repository Management

```http
POST   /repo/create              # Create new repository
GET    /repo/all                 # List all repositories
GET    /repo/:id                 # Get repository by ID
GET    /repo/name/:name          # Get repository by name
GET    /repo/:userID             # Get user's repositories
PUT    /repo/:id                 # Update repository
DELETE /repo/:id                 # Delete repository
PATCH  /repo/toggle/:id          # Toggle repository visibility
```

### Issue Management

```http
POST   /issue/create             # Create new issue
GET    /issue/all                # List all issues
GET    /issue/:id                # Get issue by ID
PUT    /issue/:id                # Update issue
DELETE /issue/:id                # Delete issue
```

## 🔐 Environment Variables

```env
AWS_REGION=<your-aws-region>
AWS_S3_BUCKET_NAME=<your-bucket-name>
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
MONGODB_URI=<your-mongodb-uri>
PORT=3000
JWT_SECRET_KEY=<your-jwt-secret>
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd github-clone-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env with your credentials
```

4. **Start the server**

```bash
npm run dev     # Development
npm start       # Production
```

## 🧪 CLI Commands

```bash
node index.js init                  # Initialize repository
node index.js add <file>           # Add file to staging
node index.js commit <message>      # Commit changes
node index.js push                  # Push to remote
node index.js pull                  # Pull from remote
node index.js revert <commitID>     # Revert to commit
```

## 📝 Learning Outcomes

1. **Version Control System Architecture**

   - Understanding Git internals
   - Implementing staging and commit logic
   - Managing remote repositories

2. **Cloud Integration**

   - AWS S3 for file storage
   - Managing large file transfers
   - Secure cloud credentials handling

3. **Database Design**

   - MongoDB schema design
   - Relationships between collections
   - Efficient queries and indexing

4. **Authentication & Security**

   - JWT implementation
   - Password hashing
   - Secure user sessions

5. **API Design**
   - RESTful principles
   - Error handling
   - Status codes and responses

## 🔗 Frontend Repository

[GitHub Clone Frontend](your-frontend-url)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ Star this repository if you find it helpful!
