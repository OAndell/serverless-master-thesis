require('../util/connect.js');
const fetch = require('node-fetch');
const distanceCalculator = require('../util/connect.js');
const UserModel = require('../models/userModel');
const ServiceModel = require('../models/thirdPartyServiceModel');



module.exports.checkSubscriptions = async function(context, req) {

    let userID =  req.body.userID;
    let userPosistion = req.body.posistion;

    let subscriptions = (await UserModel.findOne({"id":userID})).subscriptions

    const responseArray = await subscriptions.map(async subscription => {
        let service = await ServiceModel.findOne({"id":subscription.id });
        let parameters = {
            posistion : userPosistion,
            settings : subscription.settings
        }
        return await fetch(service.endpointURL)
                    .then(res => res.json())
                    .then(json => {
                        return json
        });
    });


    const response = await Promise.all(responseArray)
    context.res = {
        status: 200,
        body: response
    }
    

    //let userID = req.body.userID;
};
