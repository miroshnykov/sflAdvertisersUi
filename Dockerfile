FROM ubuntu:18.04
ARG node_version=12.16.1

RUN apt-get update
RUN apt-get install build-essential apt-transport-https lsb-release ca-certificates curl wget python -y

RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install --yes nodejs

WORKDIR /home/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8087
CMD [ "node", "server.js" ]

