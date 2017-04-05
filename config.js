'use strict'

const config = {
  server: {
    port: process.env.NODE_PORT
  },
  elasticsearchserver: {
    host: process.env.ELASTICSEARCH_HOST,
    port: process.env.ELASTICSEARCH_PORT,
    index: process.env.ELASTICSEARCH_INDEX,
    type: process.env.ELASTICSEARCH_TYPE,
    log: process.env.ELASTICSEARCH_LOG
  }
}

module.exports = config
