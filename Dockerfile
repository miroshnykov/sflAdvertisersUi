FROM ubuntu:20.04
ARG node_version=12.16.1

COPY tests/run_docker_tests.sh /usr/local/bin/run_docker_tests.sh

RUN apt-get update
RUN apt-get install build-essential apt-transport-https lsb-release ca-certificates curl wget python -y

RUN apt-get install --yes git

RUN git config --global http.sslVerify "false"

RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install --yes nodejs

WORKDIR /home/app

COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
# Required to push into different stages.
ARG branch
ENV BRANCH=${branch}

ENTRYPOINT if [ "$BRANCH" = "stage1" ] ; then \
               npm run stage1 ; \
           elif [ "$BRANCH" = "stage2" ] ; then \
               npm run stage2 ; \
           else \
               npm run prod ; \
           fi