
module.exports.handle = async function(position, setting) {
   let mockresponse =  {
      queueTime: 10,
      location: "Service 1",
      message: setting,
      alert: true
  }   
   
   return mockresponse
}