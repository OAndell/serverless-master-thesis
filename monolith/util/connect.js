const mongoose = require('mongoose');
const mongoURL = 'mongodb://andell:DWjjdthP3oOZmgkW0whOMNlcEVlaYXQN3UrHA3tkIc28YFKZGJg0QbhezXjBl1rDezKNX3s83qwGdbiXXnfAhQ==@andell.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@andell@';
//const mongoURL = 'mongodb://localhost:27017/db';

mongoose.connect(mongoURL, {useNewUrlParser: true});
