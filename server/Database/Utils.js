const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@restapi.yer7u2u.mongodb.net/?retryWrites=true&w=majority&appName=RESTApi`;
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
