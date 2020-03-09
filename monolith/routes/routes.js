const userController = require("../controllers/userController.js");
const subscriptionController = require("../controllers/subscriptionController.js");
const serviceController = require("../controllers/serviceController.js")


module.exports = (app) => {

    app.route('/users')
    .get(userController.getUsers)
    .post(userController.createUser);

    app.route('/login')
    .post(userController.login);

    
    // manage users subscriptions - get all subsciptions of a user - subscribe to a service for a user.
    app.route('/subscriptions')
    .post(subscriptionController.subscribe);


    app.route('/services')
    .get(serviceController.getServices)
    .post(serviceController.addService)

    /*app.route('/checksubscriptions')
    .post(thirdPartyServiceController.checkSubscriptions);*/
  };