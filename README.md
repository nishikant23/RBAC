## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)

## About The Project

![Project_Demo](assets/compresssed_RBAC_Demo_VDo.mp4?autoplay=1)
- [Project Demo Video](https://drive.google.com/file/d/1jwI2XQ-6KJquuqthLxXtEuXigwlzwIey/view?usp=drive_link)
 

This project demonstrates a complete user authentication and authorization system using JWT tokens and role-based content access. It features a frontend and backend setup integrated with PostgreSQL for data management. The project implements robust middlewares for authentication and token management, ensuring secure and seamless user interaction.

### Key Features:

#### User Registration and Role Assignment:

- Users register on the homepage by providing a role:

  1. Enter "5526" to register as an Admin.
  2. Enter any other value to register as a User.

#### Authentication and Authorization:

- Access and Refresh Tokens

  1. Tokens are generated using JWT.
  2. Stored securely in cookies for session management.

#### Role-Based Access Management:

- Role-Based Access Control

    1. Admins can access both admin and user content.
    2. Users are restricted to accessing user content only.


#### Token Management:

- Middleware includes:

  1. Authentication of users.
  2. Validation for expired tokens.
  3. Refresh access token logic to maintain session continuity.
  

#### Database Integration:

- SQL

  1. PostgreSQL is utilized for data storage and querying.
  2. Prisma ORM is used for managing database schema and simplifying SQL queries.

#### Dockerization:

- The project includes steps to set up a PostgreSQL database container using Docker       for ease of deployment.

#### Frontend and Backend Setup:

  - A simple frontend and backend are provided, communicating seamlessly to deliver a user-friendly interface and a secure backend for API handling.

#### Secure Logout:

  - Tokens are removed from cookies upon user logout to terminate sessions securely.
  


## Built With

This project was built with the following technologies:

- [Node.js](https://nodejs.org/en)
- [React](https://react.dev/)
- [Tailwind/css](https://v2.tailwindcss.com/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma (ORM)](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Axios](https://axios-http.com/docs/intro)
- [Docker](https://www.docker.com/)
- [Typescript](https://www.typescriptlang.org/)

## Getting Started

Instructions on setting up this project locally.

### Installation

1. **Clone the Repository:** Get started by cloning the repository to your local machine.

   ```
   https://github.com/nishikant23/RBAC.git
   ```

2. **Set Up Docker and PostgreSQL:** 
   - Open the Docker application on your machine
   - Pull the PostgreSQL image into your Docker environment by running the following         command in your terminal:

     ```sh
     docker pull postgresql:latest
     ```
    - Create a PostgreSQL container in Docker by running:

    ```sh
    docker run --name postgres_container_name -e POSTGRES_PASSWORD=yourContainerPassword     -p 5432:5432 -d postgres:latest
     ```
     Replace yourContainerPassword with your desired password for the container.
     
     
3. **Verify PostgreSQL Installation (Optional):** 
  
    - If you have PostgreSQL installed locally, you can verify the installation:

      ```sh
      psql --version
    
      ```
    - Connect to the database using:

       ```sh
      psql -h localhost -d postgres -U postgres -p 5432
      ```
      

4. **Frontend and Backend Setup:**

   - Navigate to the **fe** (frontend) folder and install dependencies:

      ```sh
      npm install
      ```
   - Then run the frontend:
        ```sh
        npm run dev
        ```
    - Similarly, Navigate to the **be** (backend) folder and install dependencies:

      ```sh
      npm install
      ```
    - Then run the backend:
        ```sh
        npm run dev
        ```

5. **Set Up Environment:**

   - In the &quot;/be&quot; directory, copy the content of &quot;.env.example&quot; file and create a new file named &quot;.env&quot;. Adjust the environment variables according to your requirements or you can leave them as it is.

6. **Prisma:**

   - This project utilizes Prisma for PostgreSQL table creation and querying. Ensure you      have Prisma installed:
       ```sh
       npm install prisma --save-dev
       ```
*Once all the installation are set up, you can start the application!*


## Roadmap

The roadmap includes both completed and future goals, focusing on backend integration, frontend functionality, and robust database managemen Here&#39;s the progress so far and what’s planned for the future:

- [x] Add backend with user registration and role-based authentication
- [x] Integrate JWT for access and refresh token generation and storage in cookies
- [x] Set up PostgreSQL database using Prisma ORM for table creation and querying
- [x] Deploy backend and frontend servers via Docker containers
- [x] Develop middleware for:
  - [x] User authentication
  - [x] Token expiration validation
  - [x] Access token refresh
- [x] Implement role-based access control:
  - [x] Admins can access both admin and user content
  - [x] Users are restricted to user-specific content
- [x] Allow users to set the order of components or delete them
- [x]  Enable dynamic frontend interaction:
  - [x] Home page with "Register" and "Signin" options
  - [x] Dashboard displaying user roles and content access buttons
- [x] Allow real-time frontend/backend interaction via REST APIs
- [ ] Enhance frontend UI for better user experience
- [ ] Write comprehensive documentation and best practices
- [ ] Implement caching for faster responses
- [ ] Avoid key collisions when managing dynamic templates
- [ ] Improve middleware error handling for edge cases


We are committed to refining and expanding the project's functionality to deliver a seamless user experience while maintaining robust and secure backend processes

See the [open issues](https://github.com/nishikant23/RBAC/issues) for a full list of proposed features and known issues.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag &quot;enhancement&quot;.
Don&#39;t forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m &#39;Add some AmazingFeature&#39;`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

If you have any questions or suggestions, feel free to reach out to us:

- Raise an issue on the repository: [GitHub Repository](https://github.com/nishikant23/RBAC)
- Connect with us on Twitter: [@nishikant23](https://x.com/nishikant_rd)
