# # Gunakan Node.js sebagai base image
# FROM node:20-alpine

# # Atur direktori kerja di container
# WORKDIR /app

# # Salin package.json dan package-lock.json ke container
# COPY package*.json ./

# # Install dependencies
# RUN npm install 

# # Salin semua file proyek ke dalam container
# COPY . .

# # Set environment variables untuk produksi
# ENV NODE_ENV=production

# # Ekspose port yang digunakan aplikasi
# EXPOSE 8080

# # Jalankan aplikasi
# CMD ["npm", "run", "start"]

FROM node:20-alpine

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install 

WORKDIR /app

COPY . .

EXPOSE 8080

CMD node app.js