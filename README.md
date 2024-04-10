# fantasy-game

## script
1. cd ./app
2. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
3. nvm use 20.11.1
4. npm install 
5. docker-compose -f docker-compose.yml kill
6. docker-compose -f docker-compose.yml up -d 

*check container is already started* 

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
