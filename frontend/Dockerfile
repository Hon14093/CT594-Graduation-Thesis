FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

RUN npm update

COPY . .

EXPOSE 5173

# Vite needs HOST=0.0.0.0 for external access
ENV HOST="0.0.0.0"

# Run dev server
CMD ["npm", "run", "dev"]
