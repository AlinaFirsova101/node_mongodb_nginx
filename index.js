const http = require('http');
const hostname = require('os').hostname()
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://db:27017';

MongoClient.connect(url, function(err, client) {

const server = http.createServer(async (req, res) => {
    if (req.url === '/db') {
        const db = client.db('counter');
        const collection = db.collection('counter')
        collection.insertOne({ 'date': new Date() })
        const count = await collection.count();     
        res.end(`${count} from ${hostname}`);
    }
    res.end('Hello!:)')
  });
  server.listen(8000)
})
