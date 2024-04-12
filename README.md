# fantasy-game

## script
1. cd ./app
2. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
3. export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
4. nvm use 20.11.1
5. npm install 
6. docker-compose -f docker-compose.yml kill
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
2. eval $(minikube docker-env)
3. docker build -t fantasy/backend:latest -f dockerfile .
4. 