# This project is no longer maintained!  Use it at your own risk.

# AI Challenge [![Build Status](https://travis-ci.org/northwesternmutual/ai-challenge.svg?branch=master)](https://travis-ci.org/northwesternmutual/ai-challenge) [![Coverage Status](https://coveralls.io/repos/github/northwesternmutual/ai-challenge/badge.svg)](https://coveralls.io/github/northwesternmutual/ai-challenge?branch=master)


AI Challenge is a framework for facilitating artificial intelligence (AI) tournaments.

* **Microservice Architecture:** The AI Challenge framework conforms to a microservice architecture. As a result, each component can be deployed, swapped, maintained, implemented, tested, and scaled independently.
* **Component-Based:** This framework is composed of three primary components. While each is needed to utilize all the benefits of AI Challenge, they can be used independently as they each offer a unique set of functionality. Based on how you implement the framework for your application specific needs, you may choose to swap out or modify each component as needed.
* **Containerized:** Each component of the framework contains a [Dockerfile](https://docs.docker.com/engine/reference/builder/) which will create a Docker container for that component.
* **Production Ready:** This framework is ready to be deployed out of the box with either Kubernetes or Docker-Compose.

## Table of Contents
* [Quick Start](#quickstart)
* [Framework Uses](#framework-uses)
* [Components](#components)
* [API](#api)
* [Example](#example)
  * [Algorithm Component](#algorithm-component)
  * [Simulator Component](#simulator-component)
  * [Tournament Component](#tournament-component)
    * [Play the tournament](#play-the-tournament)
    * [Get matches list](#get-matches-list)
* [Deployment](#deployment)
  * [Docker-Compose](#docker-compose)
  * [Minikube](#minikube)
  * [Kubernetes](#kubernetes)
  * [Security](#security)
* [Contributing](#contributing)
* [License](#license)

## Quickstart

1. `npm install -g concurrently`
2. `npm run build`
3. `npm run dev`

This will install all of the dependencies and start each component in development mode. Each microservice will be accessible from the following endpoints:

component | base path
--------- | -------
algorithm | `http://localhost:8000/`
simulator | `http://localhost:8001/`  
tournament | `http://localhost:8002/`

## Framework Uses

Here are some example uses of AI Challenge:

* **Recruiting:** AI Challenge can be used to facilitate the quantitative assessment of a developer’s proficiency in an objective manner.
* **Kids:** AI Challenge can be used to teach children about artificial intelligence and/or algorithm theory.
* **Competitions:** AI Challenge can be used to conduct competitive programming competitions among developers.

## Components

AI Challenge is composed of three primary components which are explained below. Note that detailed documentation for each component can be found in their respective README files.

* **Algorithm Service:** Facilitates create/retrieve/update/delete (CRUD) operations on AI implementations. Each AI conforms to an interface of specific functions. Reference the [documentation](./algorithmService/README.md) for detailed information.
* **Simulator Service:** Preforms a simulation of two AI implementations. Reference the [documentation](./simulationEngine/README.md) for detailed information.
* **Tournament Service:** Facilitates a tournament of AI implementations. Reference the [documentation](./tournamentEngine/README.md) for detailed information.

## API
[Swagger](http://swagger.io/) is used to document each component's API. See each component's documentation for more details. In addition, an aggregated Swagger document is available [here](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/northwesternmutual/ai-challenge/master/swagger.yml&docExpansion=full).

## Example

**NOTE:** The official rules and objectives for the current game engine can be found in [`/simulatorService/GAME.md`](./simulatorService/GAME.md) and the tournament guid can be found in [`/tournamentService/TOURNAMENT.md`](./tournamentService/TOURNAMENT.md). Of course this framework can easily be extended to support more game implementations.

### Algorithm Component
In order to facilitate a tournament, AI implementations are needed. The following illustrates how an implementation might be submitted. See the full [documentation](./algorithmService/README.md) for more details.

```js
function initializeSimulation() {
	//optional
}

function initializeGame() {
	var x = -1, y = 0;
    this.getNextCoord = function() {
        if (++x > 9) {
            x = 0;
            ++y;
        }
        return {
            x: x,
            y: y
        };
    }
}

function startGame() {
    this.player.grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYTWO);
    this.player.grid.placeBlock(1, 0, Block.VERTICAL, Collection.ONEBYTHREE);
    this.player.grid.placeBlock(2, 0, Block.VERTICAL, Collection.ONEBYFOUR);
    this.player.grid.placeBlock(3, 0, Block.VERTICAL, Collection.ONEBYFIVE);
    this.player.grid.placeBlock(4, 0, Block.VERTICAL, Collection.ONEBYSIX);
}

function shoot() {
	var coords = this.getNextCoord();
    var result = this.player.shoot(coords.x, coords.y);
}

function endGame() {
	//optional
}
```
The following shows an example of how you might submit the functions that make up an AI to the `algorithm service`

```js
function getBody(func) {
	return func.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
}

$.ajax({
    type: "POST",
    url: "http://< base path >/algorithmservice/algorithms/test",
    data: {
        email: 'frankgreco@northwesternmutual.com',
        name: 'Frank B Greco Jr',
        initializeSimulation: getBody(initializeSimulation),
        initializeGame: getBody(initializeGame),
        startGame: getBody(startGame),
        endGame: getBody(endGame),
        shoot: getBody(shoot),
        date: new Date().getTime()
    }
});
```

### Simulator Component
The simulator component is used to conduct a simulation of two AI implementations. The following illustrates a sample API call and JSON response. See the full [documentation](./simulatorService/README.md) for AI implementation details.

```sh
http://< base path >/simulatorservice/simulation?algorithmOneID=580bee73f2c4c40015fdd8b8&algorithmTwoID=580bee79f2c4c40015fdd8b9&collection=test&simulations=1000
```

```json
{
  "playerOne": {
    "wins": 494,
    "losses": 506,
    "accuracy": 0.3576734006734019,
    "name": "Frank B Greco Jr",
    "id": "580bf21cf2c4c40015fdd8bf"
  },
  "playerTwo": {
    "wins": 506,
    "losses": 494,
    "accuracy": 0.3578148148148166,
    "name": "Frank B Greco Jr",
    "id": "580bf21df2c4c40015fdd8c0"
  }
}
```

### Tournament Component
See the full [documentation](./tournamentService/README.md) for more details.

There are two ways that the tournament component can be used (the following example has two submitted AI implementations):  

#### 1. Play the tournament
Since the time that it will take to complete a tournament may be longer than we want to keep an HTTP request open, we use the following sequence:
 1. Initiate a tournament.
 2. Request responds immediately with the id of the tournament and the current status.
 3. Check at any time for the status of the tournament using the tournament id.

```sh
http://< base path >/tournamentservice/play/test?games=1000
```
```json
{
  "status": "tournament in progress",
  "lastUpdated": 1477184837006,
  "_id": "580c0d45bd3b84574d930c99"
}
```
```sh
http://< base path >/tournamentservice/tourament/580c0d45bd3b84574d930c99
```
```json
{
  "_id": "5807b508e9236ae1ecc10bba",
  "status": "tournament completed",
  "lastUpdated": 1476900109346,
  "results": [
    {
      "wins": 515,
      "losses": 485,
      "email": "frankgreco@northwesternmutual.com",
      "id": "5804e98a8be19a7152b30e55"
    },
    {
      "wins": 485,
      "losses": 515,
      "email": "frankgreco@northwesternmutual.com",
      "id": "5804e9748be19a7152b30e54"
    }
  ]
}
```
#### 2. Get matches list
This option appeals in situations where a potential UI might want more control of the tournament. By returning a list of matches, the UI can execute the simulations individually.
```sh
http://< base path >/tournamentservice/matches/test
```
```json
{
  "matches": [
    {
      "algorithmOne": {
        "_id": "580bf21cf2c4c40015fdd8bf",
        "initializeSimulation": "",
        "shoot": "var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);",
        "email": "frankgreco@northwesternmutual.com",
        "initializeGame": "var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}",
        "startGame": "this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);",
        "endGame": "",
        "date": "1475186162289",
        "name": "Frank B Greco Jr"
      },
      "algorithmTwo": {
        "_id": "580bf21df2c4c40015fdd8c0",
        "initializeSimulation": "",
        "shoot": "var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);",
        "email": "frankgreco@northwesternmutual.com",
        "initializeGame": "var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}",
        "startGame": "this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);",
        "endGame": "",
        "date": "1475186162289",
        "name": "Frank B Greco Jr"
      },
      "url": "?algorithmOneID=580bf21cf2c4c40015fdd8bf&algorithmTwoID=580bf21df2c4c40015fdd8c0&collection=test&simulations=1000"
    }
  ]
}
```

## Deployment
AI-Challenge offers three solutions for out-of-the-box deployment. All of them depend on the the Dockerization of each component. The last solution, Kubernetes, is the recommendation for a production deployment.

### Docker-Compose
[Docker-Compose](https://docs.docker.com/compose/) is a great and easy tool for orchestrating a multi-container application. The `deploy/docker-compose.yml` file contains all the necessary configuration to define each microservice and connect them to each other.

Each service is externally exposed through an Nginx proxy (base path's illustrated below). Each service communicates to each other via an overlay network provided by Docker.

See the [official Docker-Compose documentation](https://docs.docker.com/compose/) to get up and running. Then, use the following command to deploy AI-Challenge.


```sh
<!-- From the directory that hosts your docker-compose.yml file -->
$ docker-compose up
```

*NOTE:* Since the Mongodb data is stored inside of a Docker container, it persists only as long as the container is healthy. Consider mapping a data directory outside of the container for more persistency.

component | base path
--------- | -------
algorithm | `http://localhost:8080/algorithmservice/`
simulator | `http://localhost:8080/simulatorservice/`  
tournament | `http://localhost:8080/tournamentservice/`

### Minikube
[Minikube](https://github.com/kubernetes/minikube) allows you to deploy a Kubernetes cluster locally on your machine. The `deploy/kubernetes.yml` file defines how your cluster will be configured.

Like Docker-Compose, each service is externally exposed through an Nginx proxy (base path's illustrated below). Each service communicates to each other via a pod overlay network provided by Kubernetes.

See the [minikube installation instructions](https://github.com/kubernetes/minikube/releases) to install minikube. You will also need to install the `kubectl` tool:
```sh
$ wget https://storage.googleapis.com/kubernetes-release/release/v1.2.0/bin/darwin/amd64/kubectl
$ chmod +x kubectl
$ mv kubectl /usr/local/bin/
```

Then, create your minikube cluster: `minikube start`

You can either create your Kubernetes cluster using the Kubernetes dashboard found at `minikube dashboard` or by executing the following commands:

```sh
$ kubectl create namespace ai-challenge
$ kubectl create -f deploy/kubernetes.yml
```

**Base Path:** run the following command to determine the base path for the externally exposed Nginx proxy.


```sh
$ echo $(minikube ip):$(kubectl get service nginx --namespace=ai-challenge -o jsonpath='{.spec.ports[*].nodePort}')
```

component | base path
--------- | -------
algorithm | `http://< base path >/algorithmservice/`
simulator | `http://< base path >/simulatorservice/`  
tournament | `http://< base path >/tournamentservice/`

### Kubernetes

*NOTE:* This is the recommended production deployment option.

[Kubernetes](http://kubernetes.io/) is an open-source system for automating deployment, scaling, and management of containerized applications.

There are many ways to deploy a kubernetes cluster. However, [these instructions](http://kubernetes.io/docs/getting-started-guides/kubeadm/) offer the fastest way to get up and running.

Once you have your cluster deployed, creating the services defined in `deploy/kubernetes.yml` is done using the same steps as in minikube:

```sh
$ kubectl create namespace ai-challenge
$ kubectl create -f deploy/kubernetes.yml
```

**Base Path:** The IP address of externally exposed Nginx proxy will depend on how implement ingress into your Kubernetes cluster. The port that this service is running on can be determined by executing the following command

```sh
$ echo $(kubectl get service nginx --namespace=ai-challenge -o jsonpath='{.spec.ports[*].nodePort}')
```

component | base path
--------- | -------
algorithm | `http://< ingress endpoint >/algorithmservice/`
simulator | `http://< ingress endpoint >/simulatorservice/`  
tournament | `http://< ingress endpoint >/tournamentservice/`

### Security

Part of AI Challenge involves the `simulatorService` component executing a player's AI implementation code. This involves executing potentially malicious code which can have negative impacts. While the framework does reject implementations that use JavaScript functions/objects that are commonly used in exploits, it is recommended that thoughtful safeguards are implemented in any production deployment.

If you plan on deploying AI Challenge using the recommended container-centric options, consider implementing network isolation so that potentially malicious code cannot penetrate an internal network.

## Contributing

AI Challenge welcomes pull requests.

### License

AI Challenge is [MIT licensed](./LICENSE).
