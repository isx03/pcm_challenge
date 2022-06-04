# PCM CHALLENGE

Challenge to create a basic app to manage food orders

## _Technologies_

- NodeJs
- Express
- ReactJS
- TypeScript
- MySQL
- Docker
- Docker Compose

## _Directories order and files_

- `apps/frontend:` Solution based on ReactJs to create interfaces.
- `app/backend:` Solution based on Express to create the API REST.
- `/databases:` Directory to mount databse container.
- `/.env.sample:` File to save the settings to work with docker containers.
- `/docker-compose.yml:` File to organice services to work with docker

## _Installation_

Copy, paste the file `./.env.sample` and rename it for `.env` and settings about your enviroment with this variables:

- MYSQL_PATH: Folder path where it will create the volume for database. It is recommended to make the volumn inside `./databases`.
- MYSQL_DB_ROOT_PASSWORD: root password for access to database.

- BACKEND_PATH: Folder path where it will create the volume for backend app.
- BACKEND_DB_NAME: Database's name.

- FRONTEND_PATH: Folder path where it will create the volume for fronted app

When you have configured, execute the following code `docker-compose up -d`

In the file `./backup` you find the script to restore database. I recommend to use the service called adminer to restore database of easy way.

Enter to `http://localhost:3001` to use service adminer, you must put user and password credentials to access to database.
When you are connected, create a database with the same name tha you setted in the variable `BACKEND_DB_NAME` in `/.env` file. After enter the new database and go to `Export` option and attach the backup file.

At the end of the process you can connect to application visual from the next link:
`http://localhost:3003`

## _ENDPOINTS_

### GET ORDERS

#### Request
`GET /orders`

#### Response
```
[
    {
        "id": 1,
        "client": "Isreal Flores",
        "table_number": 4,
        "created_at": "2022-06-04T01:15:11.000Z"
    }
]
```

### CREATE ORDER

#### Request
`POST /orders/`

#### Params
```
{
    "client": "Isreal Flores",
    "table_number": 4,
    "dishes": [{
        "name": "Juane",
        "price": 5,
        "qty": 2
    },
    {
        "name": "Tacacho",
        "price": 2,
        "qty": 4
    }]
}
```

#### Response
```
{
    "message": "Proceso realizado"
}
```

### EDIT ORDER

#### Request
`GET /orders/:id`

#### Response
```
{
    "id": 1,
    "client": "Isreal Flores",
    "table_number": 4,
    "dishes": [
        {
            "qty": 2,
            "name": "Juane",
            "price": 5
        },
        {
            "qty": 4,
            "name": "Tacacho",
            "price": 2
        }
    ]
}
```

### UPDATE ORDER

#### Request
`PUT /orders/:id`

#### Params
```
{
    "client": "Isreal Flores",
    "table_number": 4,
    "dishes": [{
        "name": "Jane",
        "price": 5,
        "qty": 2
    }]
}
```

#### Response
```
{
    "message": "Proceso realizado"
}
```

### DELETE USER

#### Request
`DELETE /orders/:id`

#### Response
```
{
    "message": "Proceso realizado"
}
```

