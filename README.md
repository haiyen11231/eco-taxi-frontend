# EcoTaxi Frontend

EcoTaxi Frontend is a web application for managing and booking taxis, developed using ReactJS, TypeScript, Sass, Redux, Ant Design, and other modern web technologies.

## Git Repositories

This project is part of the EcoTaxi ecosystem, which includes multiple repositories for the frontend, backend services, and API gateway:

- **Frontend**: [EcoTaxi Frontend](https://github.com/haiyen11231/eco-taxi-frontend.git)
- **API Gateway**: [EcoTaxi API Gateway](https://github.com/haiyen11231/eco-taxi-api-gateway.git)
- **User Service**: [EcoTaxi User Service](https://github.com/haiyen11231/eco-taxi-backend-user-service.git)
- **Payment Service**: [EcoTaxi Payment Service](https://github.com/AWYS7/eco-taxi-payment-service.git)
- **Trip Service**: [EcoTaxi Trip Service](https://github.com/lukea11/eco-taxi-backend-trip-service.git)

## Directory Structure

```plaintext
eco-taxi-frontend/
│
├── public/
│
├── src/                          # Source code of the application
│   ├── assets/                   # Media files (images)
│   ├── components/               # Reusable UI components
│   ├── const/                    # Constants and configurations used across the application
│   ├── pages/                    # Main pages of the application, corresponding to different routes
│   ├── services/                 # API calls and service-related logic
│   ├── store/                    # Redux or state management logic for managing global state
│   ├── styles/                   # Global styles
│   ├── types/                    # TypeScript type definitions for strict type-checking
│   ├── utils/                    # Utility functions and helpers
│   ├── App.tsx                   # Main application component, where routing and layout structure is defined
│   ├── main.tsx                  # Entry point for React, renders the application into the DOM
│   └── vite-env.d.ts             # TypeScript declaration file for Vite environment variables
│
├── .gitignore                    # Specifies which files and directories should be ignored by Git
├── Dockerfile                    # Docker configuration to build and run the application in a container
├── eslint.config.js              # ESLint configuration file to enforce coding standards and style
├── index.html                    # The main HTML file that serves as the entry point to the app
├── package-lock.json             # Lock file to ensure consistent versions of dependencies across installations
├── package.json                  # Defines the project dependencies, scripts, and metadata
├── tsconfig.app.json             # TypeScript configuration specific to the application
├── tsconfig.app.tsbuildinfo      # TypeScript build information for the application
├── tsconfig.json                 # Main TypeScript configuration file
├── tsconfig.node.json            # TypeScript configuration specific to Node.js environments
├── tsconfig.node.tsbuildinfo     # TypeScript build information for Node.js environment
├── vite.config.ts                # Vite configuration for optimizing and building the app
└── README.md                     # Project documentation providing an overview and setup instructions
```

## Features

- User-friendly interface for booking taxis.
- View trip details, including estimated time and fare.
- Real-time taxi availability and distance calculation.
- Interactive map using Leaflet to visualize pickup and destination locations.
- User-friendly interface with responsive design powered by **AntDesign**.
- Route navigation with **React Router DOM**.
- State management using **Redux** for efficient state handling across components.
- Stylish icons from **FontAwesome** and **Freepik**.

## Technologies Used

- **Frontend**: ReactJS, TypeScript, Sass, AntDesign
- **State Management**: Redux for managing global state
- **HTTP Client**: Axios for making API calls
- **Routing**: React Router DOM for navigation
- **Icons**: FontAwesome and Freepik for UI icons
- **Map**: Leaflet for interactive maps
- **Bundler**: Vite

## Prerequisites

Before you begin, ensure that you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **Docker** (optional, for containerization)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/haiyen11231/eco-taxi-frontend.git
   cd eco-taxi-frontend
   ```

2. Install dependencies:

   ```bash
   go mod tidy
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

This will start the application locally on http://localhost:5173
