FROM node:20-slim

WORKDIR /app

# Set npm registry & retries to help avoid network errors
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-factor 2 \
    && npm config set fetch-retry-mintimeout 10000 \
    && npm config set fetch-retry-maxtimeout 60000

# Copy only package files first (for better build cache)
COPY package*.json ./

# Install dependencies with better offline behavior
RUN npm install --prefer-offline --no-audit --progress=false

# Copy the rest of the source
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
