FROM node

COPY . .

CMD ["npm", "run", "app.js"]