`docker pull mongo`

```bash
 docker run -d ^
  --name mongodb ^
  -p 27017:27017 ^
  -e MONGO_INITDB_ROOT_USERNAME=admin ^
  -e MONGO_INITDB_ROOT_PASSWORD=password123 ^
  mongo
```

### Explain

`-d`= run in background
`--name mongodb` = container name
`-p 27017:27017` = expose MongoDB port
`MONGO_INITDB_ROOT_USERNAME` = admin username
`MONGO_INITDB_ROOT_PASSWORD` = admin password
