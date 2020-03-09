const UserModel = require('../models/userModel')


exports.subscribe = async (req,res) => {
    let userID = req.body.userID;
    let serviceObj = req.body.serviceObj;
    let add = true;

    user = await UserModel.findOne({'id':userID}); 
    await user.subscriptions.forEach(service => {
        if(service.id === serviceObj.id){
            res.status(400).send("Already subscribed");
            add = false;
            return ;
        }
    });
    if(add){
        await UserModel.findOneAndUpdate({'id': userID}, {$addToSet: {'subscriptions': serviceObj}}).then(() => {
            res.status(200).send("Subscribed to service " + serviceObj.id);
        }).catch((err)=>{
            res.status(400).send(err);  
          });
    }
};
