FROM izisoftwware/nest8node14ubuntunginx:latest AS development

WORKDIR /home/app

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "start:dev"]
