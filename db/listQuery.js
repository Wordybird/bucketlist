var MongoClient = require('mongodb').MongoClient;

var ListQuery = function() {
    this.url = 'mongodb://localhost:27017/bucket_lists';
}

ListQuery.prototype = {
    all: function(onQueryFinished) {
        MongoClient.connect(this.url, function(err, db) {
            var collection = db.collection('lists');
            collection.find().toArray(function(err, docs) {
                onQueryFinished(docs);
            })
        })
    },
    update: function(list, onQueryFinished) {
        MongoClient.connect(this.url, function(err, db) {
            var collection = db.collection('lists');
            collection.update(
                {'name': list.name}, 
                {$set: {
                    'items': list.items
                }});
            collection.find().toArray(function(err, docs) {
                onQueryFinished(docs);
            })
        }
        {
            add: function(listToAdd, onQueryFinished) {
            MongoClient.connect(this.url, function(err, db) {
                if (db) {
                 var collection = db.collection('lists');
                 collection.insert(listToAdd);
                 collection.find().toArray(function(err, docs) {
                 onQueryFinished(docs);
                });
                };
            })
        }
    )}
};

module.exports = ListQuery;