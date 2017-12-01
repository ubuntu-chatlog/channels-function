"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch_1 = require("elasticsearch");
var es = new elasticsearch_1.Client({
    host: process.env.ELASTICSEARCH_URL,
});
exports.handler = function (event, context, callback) {
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
    }).then(function (r) {
        var data = r.aggregations.channels.buckets
            .map(function (v, idx) { return v.key; })
            .sort();
        var response = {
            statusCode: 200,
            headers: {},
            body: JSON.stringify(data),
        };
        console.log(response);
        callback && callback(undefined, response);
    }).catch(function (e) { callback && callback(e, undefined); });
};

