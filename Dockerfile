FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copie chaque fichier explicitement
COPY server.js ./
COPY config/ ./config/
COPY controllers/ ./controllers/
COPY middleware/ ./middleware/
COPY models/ ./models/
COPY routes/authRoutes.js ./routes/
COPY routes/patientRoutes.js ./routes/
COPY routes/rdvRoutes.js ./routes/
COPY routes/salleRoutes.js ./routes/
COPY routes/medecinRoutes.js ./routes/
COPY routes/consultationRoutes.js ./routes/

EXPOSE 5000

CMD ["node", "server.js"]