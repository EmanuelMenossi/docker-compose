1) Primeiro passo para rodar o projeto é executar os seguintes comandos no terminal:
 
docker pull emanuelmenossi/mysqlatv04:latest

docker pull emanuelmenossi/aula-atv04:0.1.0

2) Utilizar o seguinte comando para criar uma rede Docker personalizada:

docker network create mynetwork

3) Executar os seguintes comandos para iniciar a aplicação

docker run -d --name mysql-container --network=mynetwork -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=achilesDB -p 3306:3306 mysql:latest

docker run -d --name nodejs-container --network=mynetwork -p 3000:3000 -e DB_HOST=mysql-container -e DB_USER=root -e DB_PASSWORD=root -e DB_NAME=achilesDB emanuelmenossi/aula-atv04:0.1.0

4) Teste os seguinte endpoints:

http://localhost:3000/consulta-dados

http://localhost:3000/liveness

http://localhost:3000/readiness

5) Link para acessar os repositórios links: 

https://github.com/EmanuelMenossi/NodeJsDocker/tree/main

https://hub.docker.com/r/emanuelmenossi/mysqlatv04

https://hub.docker.com/r/emanuelmenossi/aula-atv04