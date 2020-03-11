
module.exports.handle = async function(context, req) {

    let mockresponse =  {
        queueTime: queuetime,
        location: "Service 1",
        message: req.body,
        alert: true
    }   

    context.res ={
        status:200,
        body: mockresponse
    }
}