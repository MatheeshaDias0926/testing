# Server README

# mern-test-automation Server

This directory contains the server-side code for the MERN Test Automation project. It is built using Node.js and Express, providing RESTful API endpoints for user authentication and data management.

## Project Structure

- **controllers/**: Contains the logic for handling requests related to authentication.
- **models/**: Defines the data models used in the application, including the User model.
- **routes/**: Contains the route definitions for the API endpoints.
- **tests/**: Includes unit and integration tests for the server functionality.
- **app.js**: The main entry point for the server application.
- **package.json**: Contains metadata and dependencies for the server application.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd mern-test-automation/server
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the server**:
   ```
   npm start
   ```

4. **Run tests**:
   ```
   npm test
   ```

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a token.

## Testing

The server includes tests for API endpoints and database interactions. You can run the tests using the command mentioned above.

## License

This project is licensed under the MIT License. See the LICENSE file for details.