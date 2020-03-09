const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserModelSchema = new Schema({
    name:{ 
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
    },
    id: {
        type: Number,
        unique: true,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    subscriptions: [
        {
            id: Number,
            settings: Object,
        }
    ],
    position:{
        timestamp: {
            type: Number,
            default: Date.now(),
            required:true
        },
        lat: {
            type: Number,
            default: null
        },
        long: {
            type: Number,
            default: null
        }
    }
   
});
var UserModel = mongoose.model('UserModel', UserModelSchema);

module.exports = UserModel;