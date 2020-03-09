const mongoose = require('mongoose');
//const mongoURL = 'mongodb://oscan898:vu9TVdEFu0FVxT2Zpxmm66XgZCgQKbXIToFcVZ1eD6BD1OipfskqOmJeyFexf8n9ENYAFp9xKGqR415zjHQWDg==@oscan898.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
const mongoURL = 'mongodb://localhost:27017/db';

mongoose.connect(mongoURL, {useNewUrlParser: true});
