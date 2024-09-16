# api/Dockerfile

# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port that Hono API runs on
EXPOSE 3000

# Define environment variables
ENV MONGO_URL=mongodb://mongo:27017/mydb

# Start the API
CMD ["npm", "run", "index.ts"]
