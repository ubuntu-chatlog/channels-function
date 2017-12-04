"use strict";
var elasticsearch_1 = require("elasticsearch");
var es = new elasticsearch_1.Client({
    host: process.env.ELASTICSEARCH_URL,
});
module.exports = (content, callback) => {
    es.search({
        body: {
            "size": 0,
            "aggs": {
                "channels": {
                    "terms": {
                        "field": "channel.keyword",
                        "size": 500,
                        "order": {
                            "_term": "desc",
                        },
                    },
                },
            },
        },
    })
    .then(r => { callback(undefined,
            r.aggregations.channels.buckets.map(v => v.key).sort()); })
    .catch(e => { callback(e, undefined) })
};

