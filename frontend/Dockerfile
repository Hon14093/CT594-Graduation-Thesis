# Use official Node image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Vite needs HOST=0.0.0.0 for external access
ENV key="0.0.0.0"

# Run dev server
CMD ["npm", "run", "dev"]
