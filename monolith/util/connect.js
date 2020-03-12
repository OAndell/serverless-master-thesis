const mongoose = require('mongoose');
const mongoURL = 'mongodb://oscan898:zVA2GUMxa5DllVsq67htrmsWK8IL9gukpjgAhh2eUEmzfNEPdRrc5DMDoi8V6U7f542jrXy95GbnFvXXfoPd0w==@oscan898.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@oscan898@';
//const mongoURL = 'mongodb://localhost:27017/db';

mongoose.connect(mongoURL, {useNewUrlParser: true});
