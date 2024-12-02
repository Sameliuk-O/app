## ComunApp 

## 1) React Setup
Open in terminal folder client

```bash
npm install
```

start project
```bash
    npm run dev
```

## 2) Nest Setup
Open in terminal folder server

```bash
npm install
```

start project
```bash
    npm run start
```

## 3) PostgresSql
Create database

    Database Name: comunappDB
    
## 4) Keycloak
Download [Keycloak](https://www.keycloak.org/)

Open downloaded folder 
    
    Open folder themes
        - Create folder ComunApp
            - Add the login folder, which is located at the root of the repository 
        - Open terminal and folder bin 
            - Write comand in terminal ./kc.sh start-dev
        - Open http://localhost:8080/
            - Create account
            - Create realm ComunApp
            - Go to Realm settings
            - In General 
                - Realm ID: ComunApp
            - In Login 
                - Turn on
                    - User registration
                    - Forgot password
                    - Remember me 
                    - Email as username 
                    - Login with email 
            - In Themes
                - Login theme
                    - comunapp
            - In Localize 
                - Supported locales 
                    - Ukraine