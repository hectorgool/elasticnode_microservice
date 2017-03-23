#source $0

export NODE_PORT=3000
echo $NODE_PORT

export ELASTICSEARCH_HOST=`docker inspect --format '{{ .NetworkSettings.IPAddress }}' elasticsearch`
echo $ELASTICSEARCH_HOST

export ELASTICSEARCH_PORT=9200
echo $ELASTICSEARCH_PORT

export ELASTICSEARCH_INDEX=mx
echo $ELASTICSEARCH_INDEX

export ELASTICSEARCH_TYPE=postal_code
echo $ELASTICSEARCH_TYPE

export ELASTICSEARCH_LOG=trace
echo $ELASTICSEARCH_LOG

