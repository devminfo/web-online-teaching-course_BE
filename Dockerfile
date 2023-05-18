# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the NestJS application will listen on
EXPOSE 3000

# Start the NestJS application
CMD [ "npm", "run", "start:prod" ]
