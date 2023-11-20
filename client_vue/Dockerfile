FROM node:alpine

WORKDIR /app/client_vue

# Download `vue.js` to serve locally - without this an internet connection is required
#RUN apk add --no-cache \
#    curl
#RUN curl https://unpkg.com/vue@next -L -o vue.js

COPY . .
RUN npm install vue

COPY . .

ENTRYPOINT ["node", ""]