
![Banner](https://user-images.githubusercontent.com/30063455/138953928-65d27343-1cb0-419e-95c9-ce670a94209b.png)
# Acesso-Bankly Architect Test
Hi! This application was developed as a test for **Acesso/Bankly** specialist architect position. Feel free to open new issues and suggest new features.


## Dependencies

Yeah, we took care about everything for you. You just need [Docker](https://www.docker.com/) installed on your machine.

## Running

Easy-peasy! Just run the following command and wait for applications to start.

    $ docker-compose up -d

## Endpoints

After applications start, you will be able to find the endpoints in [localhost](localhost:3333), port 3333.

## Architecture
Here's a simple diagram of how this application works. 


```mermaid
graph LR
A[producer] -- message --> B[kafka]
A -- data --> C[elastic]
A -- data --> D[postgresql]
B -- message --> E[consumer]
E -- verify account --> F[account-api]
F --> E[consumer]
E -- update transaction --> D
E -- update transaction --> C
```