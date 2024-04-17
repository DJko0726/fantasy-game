# fantasy-game

## script
1. cd ./app
2. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
3. export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
4. nvm use 20.11.1
5. npm install 
6. docker-compose -f docker-compose.yml kill
(change docker-compose node volume directory)
7. docker-compose -f docker-compose.yml up -d 
8. docker exec -it postgres-fantasyBK bash
9. psql -U postgres
10. create database basketball;
11. \c basketball
12. 
***
CREATE TABLE player_data (
    uid UUID  PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    season VARCHAR(4) NOT NULL,
    team VARCHAR(10),
    position VARCHAR(10),
    game_played INTEGER,
    game_started INTEGER,
    point INTEGER,
    rebounds INTEGER,
    assists INTEGER,
    blocked INTEGER,
    steals INTEGER,
    turnovers INTEGER,
    fg_percentage FLOAT,
    ft_percentage FLOAT,
    three_point INTEGER,
    three_point_percentage FLOAT,
    dd INTEGER,
    average_fantasy_point FLOAT,
    created_time TIMESTAMP DEFAULT NOW(),
    updated_time TIMESTAMP DEFAULT NOW()
);
***
13. exit container
14. docker-compose -f docker-compose.yml up -d 
15. GET http://127.0.0.1:3000/ *test if works*


## api
1. POST http://127.0.0.1:3000/player-get 

*get player data*

    request body = {
        "player":"Nikola Jokic"
    }

2. POST http://127.0.0.1:3000/player-update 

*update player data in db*

    request body = {
        "season_year": "2024"
    }

## cronjob
cron.js

## minikube
### install

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64

### scirpt

1. minikube start 
2. sudo apt-get update
3. sudo apt-get install -y apt-transport-https ca-certificates curl gpg
4. curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
5. echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

6. sudo apt-get update
7. sudo apt-get install -y kubectl
8. eval $(minikube docker-env)
9. docker build -t fantasy/backend:latest -f dockerfile .
10. kubectl delete -f your-deployment.yaml
11.  kubectl apply -f your-deployment.yaml
kubectl get pods(check status)
kubectl get services
