const fetch = require('node-fetch');
const distanceCalculator = require('../util/distanceCalculator');
const UserModel = require('../models/userModel');
const ServiceModel = require('../models/thirdPartyServiceModel');

const service1 = require('../thirdPartyServices/service1')


exports.addService = async function(req, res) {
    let serviceModel = new ServiceModel(req.body);
    await serviceModel.save().then(()=>{
          res.status(200).send("Service Added");
    }).catch((err) => {
        res.status(400).send(err); 
    });
};

exports.getServices = async function(req, res) {
    let result = await ServiceModel.find({})
    .catch((err) => {
          res.status(400).send(err);
    });
    res.status(200).send(result);

};

exports.checkSubscriptions = async (req, res) => {

    let userID =  req.body.userID;
    let userPosistion = req.body.position;
    let subscriptions = (await UserModel.findOne({"id":userID})).subscriptions
  
    const responseArray = await subscriptions.map(async subscription => {
        let service = await ServiceModel.findOne({"id":subscription.id });
        if(distanceCalculator.calculateDistance(userPosistion, service.position) < subscription.settings.distance){
            if(service.id == 0){
                //call servvice 0
            }
            if(service.id == 1){
                return service1.handle(userPosistion, subscription.settings);
            }
            //...
            else{ 
                return null
            }
         }
    });

    const response = await Promise.all(responseArray)
    console.log("responseArr", response);
    res.send(response);
}