require('../src/util/connect.js');
const UserModel = require('../src/models/userModel')

module.exports = async function (context, req) {
    let userID = req.body.userID;
    let serviceObj = req.body.serviceObj;
    let add = true;

    user = await UserModel.findOne({'id':userID}); 
    await user.subscriptions.forEach(service => {
        if(service.id === serviceObj.id){
            context.res = {
                status: 200,
                body: "Already subscribed",
            };
            add = false;
            return ;
        }
    });
    if(add){
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
}