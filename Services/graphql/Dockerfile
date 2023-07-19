FROM node:18

WORKDIR /diatory-service/
COPY ./package.json /diatory-service/
COPY ./yarn.lock /diatory-service/
RUN yarn install

COPY . /diatory-service/
CMD yarn start:dev

