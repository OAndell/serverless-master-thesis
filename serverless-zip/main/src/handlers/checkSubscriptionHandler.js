require('../util/connect.js');
const fetch = require('node-fetch');
const distanceCalculator = require('../util/distanceCalculator');
const UserModel = require('../models/userModel');
const ServiceModel = require('../models/thirdPartyServiceModel');



module.exports.checkSubscriptions = async function(context, req) {

    let userID =  req.body.userID;
    let userPosistion = req.body.position;
    let subscriptions = (await UserModel.findOne({"id":userID})).subscriptions
    
    const responseArray = await subscriptions.map(async subscription => {
        let service = await ServiceModel.findOne({"id":subscription.id });
       
        if(distanceCalculator.calculateDistance(userPosistion, service.position) < subscription.settings.distance){
            let parameters = {
                posistion : userPosistion,
                settings : subscription.settings
            }
            return await fetch(service.endpointURL, { method: 'POST', body: parameters })
                        .then(res => res.text())
                        .then(json => {
                            return json
            });
         }
    });


    const response = await Promise.all(responseArray)
    context.res = {
        status: 200,
        body: response
    }
    

};
