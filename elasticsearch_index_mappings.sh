
curl -X DELETE $ELASTICSEARCH_HOST:$ELASTICSEARCH_PORT/$ELASTICSEARCH_INDEX

curl -X PUT "http://$ELASTICSEARCH_HOST:$ELASTICSEARCH_PORT/$ELASTICSEARCH_INDEX" -d '
{
    "settings": {
        "index": {
            "analysis": {
                "analyzer": {
                    "autocomplete": {
                        "tokenizer": "whitespace",
                        "filter": [
                            "lowercase",
                            "engram"
                        ]
                    }
                },
                "filter": {
                    "engram": {
                        "type": "edgeNGram",
                        "min_gram": 1,
                        "max_gram": 10
                    }
                }
            }
        }
    },
    "mappings": {
        "postal_code": {
            "properties": {
                "cp": {
                    "type": "multi_field",
                    "fields": {
                        "cp": {
                            "type" : "float", 
                            "store" : "yes", 
                            "precision_step" : "4"
                        }
                    }
                },
                "colonia": {
                    "type": "multi_field",
                    "fields": {
                        "colonia": {
                            "type": "string",
                            "index": "not_analyzed",
                            "store": "yes"
                        }
                    }
                },                 
                "ciudad": {
                    "type": "multi_field",
                    "fields": {
                        "ciudad": {
                            "type": "string",
                            "index": "not_analyzed",
                            "store": "yes"
                        }
                    }
                },                                
                "delegacion": {
                    "type": "multi_field",
                    "fields": {
                        "delegacion": {
                            "type": "string",
                            "index": "not_analyzed",
                            "store": "yes"
                        }
                    }
                },    
                "location": {
                    "type": "geo_point"
                }
            }
        }
    }
}
'
