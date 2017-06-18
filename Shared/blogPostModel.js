var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogPostSchema = new Schema({
    id: 'number',
    title: 'string',
    date: 'date',
    content: 'string'
});
module.exports = mongoose.model('BlogPost', blogPostSchema);