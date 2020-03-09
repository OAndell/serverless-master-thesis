require('../util/connect.js');
const ServiceModel = require('../models/thirdPartyServiceModel')


module.exports.addService = async function(context, req) {
    let serviceModel = new ServiceModel(req.body);
    await serviceModel.save().then(()=>{
        context.res = {
            status: 200,
            body: 'Service Added',
          };
    }).catch((err) => {
        context.res = {
            status: 400,
            body: err,
          };
    });
};

module.exports.getServices = async function(context, req) {
    let result = await ServiceModel.find({})
    .catch((err) => {
        context.res = {
            status: 400,
            body: err,
          };
    });
    context.res = {
        status: 200,
        body: result
    };
};