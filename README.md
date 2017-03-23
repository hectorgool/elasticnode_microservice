# ElasticSearch.js Microservice

### 1. Create a proyect:

```sh
npm init
```

the line above, creates the package.json file.

### 2. Install express:

```sh
npm install express --save
```

add dependencies to the package json file.

### 3. Create git repotitory:

```sh
git init
git add .
git commit -m “install”
```

### 4. Install elasticsearch client:

```sh
npm install --save elasticsearch
```

### 5. Install ElasticSearch Server in Docker Container:

```sh
docker pull elasticsearch:2.3
```

### 6. Run elasticsearch

```sh
docker run -d --name elasticsearch --restart=always elasticsearch:2.3
```

### 7. Test the ElasticSearch Server Container via Linux terminal:

```sh
curl `docker inspect --format '{{ .NetworkSettings.IPAddress }}' elasticsearch`':9200'
```

### 8. Load index and mapping:

```sh
sh elasticsearch_index_mappings.sh
```

### 9. Load documents:

```sh documents.sh
sh documents.sh
```

# Start server:

```sh
node index
```

# Create a Node Docker Container


### Building your image:
```sh
$ docker build -t nodejs_app:v0 .
```

### Run the image:
```sh
docker run -p 8081:3000 -d \
--link elasticsearch:elasticsearch \
--name nodejs_app \
nodejs_app:v0
```

### Curl test:
```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" 
curl -i -H "Accept: application/json" -H "Content-Type: application/json" 
curl -d '{"term":"villa cortes"}' -H "Content-Type: application/json" http://127.0.0.1:3000/
```

### vim replace:
```sh
:%s/FindMe/ReplaceME/g
```

### vim replace:
```sh
npm start
```

### vim replace:
```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://`docker inspect --format '{{ .NetworkSettings.IPAddress }}' elasticsearch`:3000/ping
```


### References:
* http://expressjs.com/es/starter/installing.html
* http://dillinger.io/
* https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/quick-start.html
* https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-2-1.html
* http://expressjs.com/es/api.html
* https://www.cyberciti.biz/faq/linux-unix-vim-find-replace-text-string-words/
* https://aws.amazon.com/es/elasticsearch-service/faqs/

