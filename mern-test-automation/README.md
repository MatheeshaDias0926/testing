# mern-test-automation

This project is a MERN stack application that includes a client-side React application, a server-side Node.js application, and end-to-end testing setup. 

## Project Structure

The project is organized into the following directories:

- **client/**: Contains the React application.
  - **public/**: Static assets such as images and icons.
  - **src/**: Source code for the React application.
    - **components/**: Contains React components.
    - **tests/**: Unit tests for components.
  - **package.json**: Metadata and dependencies for the client application.
  - **README.md**: Documentation for the client application.

- **server/**: Contains the Node.js backend application.
  - **controllers/**: Logic for handling requests.
  - **models/**: Database models.
  - **routes/**: API routes.
  - **tests/**: Tests for the server application.
  - **package.json**: Metadata and dependencies for the server application.
  - **README.md**: Documentation for the server application.

- **e2e/**: Contains end-to-end testing setup.
  - **pages/**: Page objects for testing.
  - **tests/**: End-to-end tests.
  - **config/**: Configuration for testing.
  - **package.json**: Metadata and dependencies for the end-to-end testing.
  - **README.md**: Documentation for the end-to-end testing setup.

- **.github/**: Contains GitHub Actions workflows for CI/CD.
  - **workflows/**: Workflow definitions.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-test-automation
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

4. Install dependencies for end-to-end testing:
   ```
   cd ../e2e
   npm install
   ```

### Running the Application

- To start the client application:
  ```
  cd client
  npm start
  ```

- To start the server application:
  ```
  cd server
  npm start
  ```

### Running Tests

- To run unit tests for the client:
  ```
  cd client
  npm test
  ```

- To run tests for the server:
  ```
  cd server
  npm test
  ```

- To run end-to-end tests:
  ```
  cd e2e
  npm test
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.