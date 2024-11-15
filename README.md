# EcoTaxi Frontend

EcoTaxi Frontend is a web application for managing and booking taxis, developed using ReactJS, TypeScript, Sass, Redux, Ant Design, and other modern web technologies.

## Directory Structure

```plaintext
eco-taxi-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── const/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .gitignore
├── Dockerfile
├── eslint.config.js   # ESLint configuration file
├── index.html         # Main HTML file
├── package-lock.json  # Lock file for dependencies
├── package.json       # Project dependencies and scripts
├── tsconfig.app.json  # TypeScript configuration for the app
├── tsconfig.app.tsbuildinfo
├── tsconfig.json      # Main TypeScript configuration
├── tsconfig.node.json # TypeScript configuration for Node.js
├── tsconfig.node.tsbuildinfo
├── vite.config.ts     # Vite configuration file
└── README.md                     # Project documentation
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
   npm install
   ```

3. Start the development server:

```bash
  npm run dev
```

This will start the application locally on http://localhost:5173
