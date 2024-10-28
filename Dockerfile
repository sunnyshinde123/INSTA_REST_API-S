# OS with Env (BASE IMAGE)
FROM node:latest

# Working Directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json /app/

# Copy the code
COPY . .

# Install libraries and dependencies
RUN npm install

# Expose the port
EXPOSE 4040

# Run the server
CMD ["node", "index.js"]
