FROM public.ecr.aws/docker/library/node:latest
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn global add typescript
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
