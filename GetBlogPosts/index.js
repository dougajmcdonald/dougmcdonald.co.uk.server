module.exports = function (context, req) {

  var mongoose = require('mongoose');
  var blogPostModel = require('../Shared/blogPostModel.js');

  var uri = 'mongodb://dougajmcdonald:SeatCupra51@ds056559.mlab.com:56559/dougmcdonald';
  var db = mongoose.connect(uri);

  blogPostModel.find({}).then(function(data) {
    context.res = {
        body: JSON.stringify(data)
    };
    context.done();
  });


    // if (req.query.name || (req.body && req.body.name)) {
    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: "Hello " + (req.query.name || req.body.name)
    //     };
    // }
    // else {
    //     context.res = {
    //         status: 400,
    //         body: "Please pass a name on the query string or in the request body"
    //     };
    // }

};