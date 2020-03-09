


const UserModel = require('../models/userModel')


exports.getUsers = async (req, res) => {
    let userID = req.query.userID
    if(req.query.userID){
        users = await UserModel.findOne({"id": userID},  '-password');
    }
    else{
        users = await UserModel.find({}, '-password');
    }
    res.status(200).send(users);
}

exports.createUser = async (req,res) => {
    let newUser = new UserModel(req.body);
        await newUser.save().then(()=>{
            res.status(200).send("User Created")
        }).catch((err) => {
            res.status(400).send(err)
        });
};

module.exports.login = async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    storedUser = await UserModel.findOne({"email": email});
    if(password === storedUser.password){
        storedUser["password"] = null;
        res.status(200).send(storedUser);
    }
    else {
      res.status(403).send(Unauthorized);
    }
}