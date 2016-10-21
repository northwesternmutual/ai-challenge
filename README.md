# AI Challenge [![Build Status](https://travis-ci.com/northwesternmutual/ai-challenge.svg?token=MkdavBWRqQGB4gWqK2cR&branch=master)](https://travis-ci.org/facebook/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

AI Challenge is a framework for fascilitating artificial intelligence (AI) tournaments.

* **Microservice Architecture:** The AI Challenge framework conforms to a microservice architecture. As a result, each component can be deployed, swapped, maintained, implemented, tested, and scaled independently.
* **Component-Based:** This framework is composed of three primary components. While each is needed to utilize all the benefits of AI Challenge, they can be used independently as they each offer a unique set of functionality. Based on how you implement the framework for your application specific needs, you may choose to swap out or modify each component as needed.
* **Dockerized:** Each component of the framework contains a [Dockerfile](https://docs.docker.com/engine/reference/builder/) which will create a Docker container for that component. Docker Compose is used to run this multi-container framework.

## Example Framework Uses

* **Recruiting:**
* **Kids:**
* **Competitions:**

## Components

AI Challenge is composed of three primary components which are explained below. Note that detailed documentation for each component can be found in their respective README files.

* **Algorithm Service:** Fascilitates create/retrieve/update/delete (CRUD) operations on AI implementations. Each AI conforms to an interface of specific functions. Reference the [documentation](./algorithmService/README.md) for detailed information.
* **Simulator Service:** Preforms a simulation of two AI implementations. Reference the [documentation](./simulationEngine/README.md) for detailed information.
* **Tournament Service:** Fascilitaes a tournament of AI implementations. Reference the [documentation](./tournamentEngine/README.md) for detailed information.

Nginx is used with Docker Compose to proxy requests to and between the services.

## Examples

## API

## Installation

The fastest way to get started is to bring up the framework using [Docker Compose](https://docs.docker.com/compose/). You can use [Docker Native](https://www.docker.com/products/overview) to accomplish this locally:

```sh
<!-- From the directory that hosts your docker-compose.yml file -->
docker-compose up
```
Note that you can also run the individual components separately. See their respective README files for setup instructions.

## Contributing

AI Challenge welcomes pull requests. A [contributing guide](./CONTRIBUTING.md) is *coming soon*.

### License

AI Challenge is [MIT licensed](./LICENSE).