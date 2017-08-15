FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install --only=production

# Bundle app source
COPY build build

# Expose a port for express server
EXPOSE 3000

CMD [ "npm", "start" ]