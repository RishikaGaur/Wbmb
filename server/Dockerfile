#automatically finds distribution details
FROM node:12

#create directory named app
WORKDIR /app

#setup environmental variable
ENV NODE_ENV production

#install dependenies
COPY package*.json ./
RUN npm install

#copy contents of current directory to app directory
#we do not want to copy node_module as it has versions based on os so we will ignore it
COPY . .

#globally install pm2, help in production of node project
RUN npm install -g pm2

#port application is running
EXPOSE 3000

#run command
CMD ["pm2-runtime","index.js"]