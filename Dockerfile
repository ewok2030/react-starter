FROM node:boron as build-env

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Copy the src code into build-env
COPY src src
# build the app
RUN npm run build

### build the release container
FROM node:boron

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=build-env /app/build .

# Expose a port for express server
EXPOSE 3000

CMD [ "node", "index.js" ]