require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const url = `${process.env.MONGODB_URI}`

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        throw err
    }
    const user = { username: 'admin', password: '123', userType: 'admin', email: "admin@gmail.com"}
    const dbinstance = client.db(process.env.MONGODATABASENAME);
    dbinstance.collection('users').insertOne(user).then((result) => {
        console.log("Successifully inserted...")
        client.close()
    }).catch((err) => {
        client.close()
    })
});