# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluye devDependencies para build)
RUN npm install

# Copiar el resto del código
COPY . .

# Generar cliente Prisma y compilar
RUN npx prisma generate
RUN npm run build


# ---------- Etapa 2: Producción ----------
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario desde builder
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

# Copiar build compilado y cliente Prisma generado
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Puerto por defecto de NestJS
EXPOSE 8081

# Comando de inicio
CMD ["node", "dist/main.js"]
