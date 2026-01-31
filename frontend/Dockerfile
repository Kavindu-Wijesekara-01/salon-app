FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Vite Server එක Docker එකෙන් එළියට පේන්න නම් --host ඕනමයි
CMD ["npm", "run", "dev", "--", "--host"]