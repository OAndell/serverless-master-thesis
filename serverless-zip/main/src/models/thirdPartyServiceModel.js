const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ThirdPartyServiceModelSchema = new Schema({
    serviceName: String,
    id: {
        type: Number,
        unique: true},
    description: String,
    position: {
        lat: Number,
        long: Number,
    },
    active: Number,
    settings : [],
    endpointURL : String
});
var ThirdPartyServiceModel = mongoose.model('ThirdPartyServiceModel', ThirdPartyServiceModelSchema);

module.exports = ThirdPartyServiceModel;