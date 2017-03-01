# Create image from dockerhub
FROM node:6

# Create a directory
RUN mkdir -p /app

# Change directory to run commands inside the specified directory
WORKDIR /app

# Copy dependency
COPY package.json /app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app

# Expose the port
EXPOSE 5000

# Serve the app
CMD ["npm", "start"]