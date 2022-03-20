FROM node:14-alpine

# create & set working directory
WORKDIR /app
COPY . .

# install dependencies
RUN npm install

# start app
RUN npm run build
CMD ["npm", "start"]