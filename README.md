
# Simple Blogging Platform

## Overview:

This project is a simple blogging platform developed using Angular, incorporating CRUD functionality for blog posts, a list and single post view, search functionality, API integration, state management, basic styling, and deployment. Additionally, Angular Universal is implemented for server-side rendering (SSR).

## Table of Contents:

1.  [Project Structure](#project-structure)
2.  [Setup Instructions](#setup-instructions)
3.  [Features](#features)
    -   [CRUD Functionality for Blog Posts](#crud-functionality-for-blog-posts)
    -   [List and Single Post View](#list-and-single-post-view)
    -   [Search Functionality](#search-functionality)
    -   [API Integration](#api-integration)
    -   [State Management](#state-management)
    -   [Basic Styling](#basic-styling)
    -   [SSR with Angular Universal](#ssr-with-angular-universal)
4.  [User Authentication](#user-authentication)
5.  [Deployment](#deployment)



## Project Structure:

The project follows a standard Angular project structure:



`- src/
 - app/
 - components/
 - services/
 - server/
 - pages/
 - ...
 - assets/
 - ...
- angular.json
- tsconfig.json
- package.json
- ...` 

## Setup Instructions:

1.  Clone the repository: `git clone [repository-url]`
2.  Install dependencies: `npm install`
3.  Run the development server: `npm start` or `ng serve`

## Features:

### CRUD Functionality for Blog Posts:

-   **Create, Read, Update, and Delete:**
    -   Blog posts can be created, read, updated, and deleted through corresponding UI elements.
-   **Post Structure:**
    -   Each post includes a title, content, and created/updated timestamp.
-   **Text Editor:**
    -   A https://quilljs.com/ editor is utilized for creating and editing posts.

### List and Single Post View:

-   **Homepage:**
    -   Lists all blog posts with pagination.
-   **Single Post View:**
    -   Displays the full content of a selected post.

### Search Functionality:

-   **Search by Title:**
    -   Users can search for posts by title.

### API Integration:


-   **Data Storage:**
    -   Uses a simple RESTful API for data storage and retrieval https://github.com/noahbuilds/stack-blog-api.

### State Management:

- **User Service:**  - Data fetching, caching, and state management are handled using a user service. - The user service stores and manages the application's state related to user data.
-  **Transfer State for Server-Side Rendering (SSR):**  - Utilizes Angular Universal's TransferState to handle server-side rendering. - The TransferState module helps in transferring state from the server to the client, improving performance and user experience.

### Basic Styling:

-   **Clean and Responsive UI:**
    -   The UI is designed to be clean, responsive, and provides a good user experience on both desktop and mobile devices.

### SSR with Angular Universal:

-   **Development SSR:**
    -   Run the SSR server in development mode: `npm run dev:ssr`
-   **Build SSR:**
    -   Build the SSR application: `npm run build:ssr`
-   **Serve SSR:**
    -   Serve the SSR application: `npm run serve:ssr`

## User Authentication:

-   **Create and Login User:**
    -   Users need to create an account or log in before creating or editing a blog post.

## Deployment:

-   **Service:**
    -   The website is deployed on Vercel.

## Bonus Features:

-   **Comments Functionality:**
    -   Users can comment on posts(coming soon😝).
-   **Likes Functionality:**
    -   Users can like a post(coming soon😝).

##  Functionality:


-   All features, including CRUD operations, pagination, search, and API integration, should work as expected.

### Responsiveness:

-   The UI is responsive and provides a good user experience on both desktop and mobile.

### Documentation:

-   Code is well-commented, and this README provides setup instructions and an overview of the project.

## Conclusion:

This Angular-based blogging platform successfully implements the required features, adheres to best practices, provides a seamless user experience with SSR, and includes user authentication for secure blog post management. The deployment ensures accessibility for users
