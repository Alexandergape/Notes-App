# Stage 1: Build
# Use the Node.js 22 Alpine image as the base image for the build stage
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Define a build-time argument for the API URL
ARG VITE_API_URL

# Set the API URL as an environment variable
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Expose the preview port (default 4173)
EXPOSE 4173

# Run Vite preview (serves built /dist folder)
CMD ["npm", "run", "preview", "--", "--host"]