FROM node:14

WORKDIR /stacks-dump
COPY . ./
RUN yarn

ENTRYPOINT ["node", "report"]

