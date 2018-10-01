# Description 
This web service calculates statistics over the given datase. The database is stored in a clickhouse docker container and is interacted with by node server. 
The API has two endpoints:
1. http://localhost:3000/unique-users
1. http://localhost:3000/loyal-users

The number of users can be queried based on a type of a device and number of os. 
Ex: http://localhost:3000/unique-users?device=1,2&os=1 

The divice ids that can be used are as follows: 
1. Undefined​ = 0 
1. Desktop​ = 1 
1. Tablet​ = 2 Smartphone​ = 3 
1. Smart TV​ = 4
1. Watch​ = 5

The os ids that can be used are as follows: 
1. Undefined​ = 0
1. MacOS​ = 1 
1. Windows​ = 2 
1. Linux​ = 3
1. iOS​ = 4
1. Android​ = 5 
1. Windows Phone​ = 6

# Setup

## Setup clickhouse container

1. Pull clickhouse docker image. Run:  
`docker pull yandex/clickhouse-server`

1. Create clickhouse container. Run: 
`docker run -d -p 8123:8123 --name test360-clickhouse-server --ulimit nofile=262144:262144 yandex/clickhouse-server`

1. Create clickhouse client container to interact with server container. Run: `docker run -it --rm --link test360-clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server`

1. Throught the client, create a DB and use that DB:

    `CREATE DATABASE Users` , then `USE Users`

1. Create a table that corresponds with the dataset inside the selected DB:

    `CREATE TABLE newsusers8 (Datetime DateTime, User Int64, Os Int32, Device Int32) ENGINE = Log`

1. From the directory where your data set (data.csv) is stored, run: 

    `cat data.csv | docker run -i --rm --link test360-clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server --query="INSERT INTO newsusers8 FORMAT CSV"`

1. Run  `curl 'http://0.0.0.0:8123/'` to test the connection 

## Start node server

From the project directory run: 

1. `npm install`
1. `npm start`

You can now open browser at `http://localhost:3000` to test the endpoints. 


# Author

Andrei Egorov


