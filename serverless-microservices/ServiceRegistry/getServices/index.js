require('../src/util/connect.js');

const ServiceModel = require('../src/models/thirdPartyServiceModel')

module.exports = async function (context, req) {
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
}