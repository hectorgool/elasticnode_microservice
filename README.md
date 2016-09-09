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
docker pull elasticsearch
```

### 6. Run elasticsearch

```sh
docker run -d --name elasticsearch elasaticsearch
```

### 7. Test the ElasticSearch Server Container via Linux terminal:

```sh
curl `docker inspect --format '{{ .NetworkSettings.IPAddress }}' elasticsearch`':9200'
```

### References:
http://expressjs.com/es/starter/installing.html
http://dillinger.io/
https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/quick-start.html
https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-2-1.html