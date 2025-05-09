# Use official Node.js runtime as a parent image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port your app runs on
EXPOSE 8000

# Start the application
CMD ["node", "dist/main"]
