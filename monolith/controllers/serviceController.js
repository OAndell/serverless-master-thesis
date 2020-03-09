const ServiceModel = require('../models/thirdPartyServiceModel')


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