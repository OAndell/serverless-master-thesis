
module.exports.handle = async function(context, req) {
    context.res ={
        status:200,
        body: "Third pary service called with settings: " + JSON.stringify(req.body)
    }
    req.body.settings;
}