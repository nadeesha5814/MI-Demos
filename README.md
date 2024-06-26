# MI-Demos
## Pre-requisites
* Run the DB schema on a Postgres DB
* Install the Postgres driver

  
## DB Schema
CREATE TABLE accounts (
    accountId SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    kycStatus VARCHAR(20) NOT NULL
);

## HTTP -> TCP
TCP Backend server execution - node tcp_server.js
Backend url - http://127.0.0.1:12345
Service url - http://localhost:8290/http-tcp
Sample Payload
{"accountId":"3","firstName":"Jim","lastName":"Parker","kycStatus":"not_verified"}

## Expose data as a service
Service url - http://localhost:8290/services/CustomerInfo/account/1

