require('../util/connect.js');
const UserModel = require('../models/userModel')



module.exports.subscribe = async function(context, req) {
    let userID = req.body.userID;
    let serviceObj = req.body.serviceObj;
    await UserModel.findOneAndUpdate({'id': userID}, {$addToSet: {'subscriptions': serviceObj}}).then(() => {
        context.res = {
            status: 200,
            body: "Subscribed to service " + serviceObj.id,
          }
    }).catch((err)=>{
        context.res = {
            status: 400,
            body: err,
          };
      });
}


