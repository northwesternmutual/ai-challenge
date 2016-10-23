# Tournament Service 

> An AI Challenge microservice for tournament fasciliation

## Description
Fascilitaes a tournament of AI implementations

## Quick Start
`npm install && npm run dev`

## Commands
* `npm run dev`: transpile es6 -> es5 and handle live changes via [nodemon](http://nodemon.io/) and enable debugging via [node-inspector](http://127.0.0.1:8081/?port=5860) 
* `npm run start`: transpile es6 -> es5 and start the application 
* `npm run test`: run all `*spec.js` files in the `spec/` directory
* `npm run lint:dev`: cache the results in a `.eslintcache` file so that only changed files are checked  
* `npm run lint:prod`: lint files without results being cached 
* `npm run docker:build`: builds your Docker image. [Docker](https://www.docker.com/) is a dependency for this command.

## Configuration
Environment configuration is fasciliated through `./confg/NODE_ENV.json`

## API
#### Documentation
[Swagger Schema](swagger.json)

## Docker
A `Dockerfile` and `.dockerignore` are included that can be used to run this application in a docker container. The base image is [alpine](https://alpinelinux.org/) and is `292.4MB`