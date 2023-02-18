FROM izisoftwware/nest8node14ubuntunginx:latest AS builder

WORKDIR /home/app

COPY . .

RUN ls -liahS

RUN npm install

RUN npm run build

FROM izisoftwware/nest8node14ubuntunginx:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/app

COPY package*.json .env.dev ./
COPY ./public ./public
RUN npm install --only=production \
    && rm -rf /etc/nginx/sites-enabled/default \
    && mv .env.dev .env \
    && rm -rf ./public/upload/tmp/* \
    && rm -rf ./public/upload/file/* \
    && rm -rf ./public/upload/image/*

COPY --from=builder /home/app/dist ./dist
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 777 ./public/upload/*
