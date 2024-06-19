Image Search Engine
## Overview
This is an image reverse search engine powered by Weaviate. The project runs using a simple React frontend and Express backend.

## Setting up
Upon forking the repo install all the necessary dependencies using:
```
npm install
```
This project runs using the ResNet-50 neural net and Weaviate's vector database which will be locally hosted using Docker.
Once all of the dependencies have been installed run the following command in the terminal to have Weaviate and ResNet run on Docker.
```
docker-compose up -d
```
Weaviate is now running at localhost:8080 and is ready to be used

## Creating a schema
Before the web app can run a schema created for weaviate. To do this run the following command in the terminal:
```
node schema.js
```
An images folder already comes pre loaded with images but can be modified.
To vectorize the images in the folder run the following command:
```
node weaviate.js 
```

## Running the web app
To run the web app first run the node.js backend with the folloing command:
```
node index.js
```
Then in a sperate terminal run the following command to run the frontend:
```
npm run dev
```