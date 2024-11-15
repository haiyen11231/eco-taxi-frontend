# Use an official Node.js image for building the application
FROM node:23-alpine3.19 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (including typescript)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production using Vite
RUN npm run build

# Use a smaller image for serving the production build
FROM node:23-alpine3.19

# Install a lightweight static file server for serving React build
RUN npm install -g serve

# Set the working directory for serving the built app
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist /app/build

# Expose port 3000 for the application
EXPOSE 3000

# Command to serve the app using 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]
