FROM node:18-alpine

WORKDIR /app

# Copy package configurations
COPY package*.json ./

# Install packages
RUN npm install --production

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
