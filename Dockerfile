FROM node:14.18.3-alpine

# docker pull node:14.18.3-alpine

# make a directory for the application, otherwise files will be copied to the root folder
RUN mkdir -p /var/opt/movie-microservice-node-test
WORKDIR /var/opt/movie-microservice-node-test

COPY package.json package.json
RUN npm install --production --quiet

# Add source files
COPY . .

ENV PORT 8000
EXPOSE 8000

# Silent start because we want to have our log format as the first log
CMD ["npm", "start", "-s"]
