module.exports = function (context, req) {

  import './Shared/mongoConfig.js';
  var mongoose = require('mongoose');

  var uri = 'mongodb://dougajmcdonald:SeatCupra51@ds056559.mlab.com:56559/dougmcdonald';
  var db = mongoose.connect(uri);

//   var blogPostSchema = new mongoose.Schema({
//     id: 'number',
//     title: 'string',
//     date: 'date',
//     content: 'string'
//   });

//   var BlogPost = mongoose.model('BlogPost', blogPostSchema);

  BlogPost.find({}).then(function(data) {
    context.res.body(JSON.stringify(data));
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
  context.done();
};