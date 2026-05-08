# Splitwise MVP

A backend service for a Splitwise MVP built with Node.js, Express, and Sequelize. This application allows users to share expenses, track balances, and manage settlements just like the real Splitwise app.

## 🚀 Features

### Users
- Register and Login with JWT Authentication.
- Set and update default currency.
- View and update profile information.
- Delete account securely.

### Expenses
- Add expenses specifying Name, Value, Currency, Split Type, Date, and Participants.
- View, update, and delete expenses.
- Settle expenses with other users.

### Balances
- View overall balances across all expenses.
- View specific balances owed to or from individual friends.
- Request an email report of current balances (Mocked via console).

### Activities
- View an activity log of all expenses and settlements.
- Filter activity logs by specific date ranges or periods (e.g., `current_month`, `last_month`).

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQLite (Relational Database)
- **ORM:** Sequelize
- **Validation:** Zod
- **Authentication:** JSON Web Tokens (JWT)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd express-sequelize-boilerplate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory based on `.env.example`. Make sure you have the following keys configured:
   ```env
   SERVER_PORT=3000
   NODE_ENV=development
   SERVER_JWT=true
   SERVER_JWT_SECRET=your_super_secret_key
   SERVER_JWT_TIMEOUT=24h
   DB_DIALECT=sqlite
   DB_NAME=database.sqlite
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *Note: Because we are using SQLite and Sequelize's `sync()` feature, the database tables will be automatically generated when you start the server for the first time.*

## 🧪 Testing the APIs (Postman)

A complete, fully functional Postman collection is included in the root directory of this repository:
**`postman.json`** (Or `Splitwise_MVP_Postman_Collection.json`)

### How to use Postman:
1. Open Postman.
2. Click **Import** and select the `postman.json` file from the repository.
3. The collection handles Authentication automatically! Simply run the **Login** request, and the collection will automatically save your JWT token and apply it to all other protected routes.

## 📁 Project Structure Highlights

- `src/controllers/`: Request handling and response formatting.
- `src/services/`: Core business logic and database interactions.
- `src/models/`: Sequelize ORM model definitions (User, Expense, Balance, ActivityLog).
- `src/routes/`: Express route definitions.
- `src/validator/`: Zod schemas for strict payload validation.


