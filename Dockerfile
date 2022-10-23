FROM node:14.20.1
WORKDIR /ycombinatornews
ENV PATH /ycombinatornews/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install react react-scripts react-dom
COPY . ./
CMD ["npm", "start"]


