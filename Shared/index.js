//module.exports = function(context, res) {

    var uri = 'mongodb://dougajmcdonald:SeatCupra51@ds056559.mlab.com:56559/dougmcdonald';
    var db = mongoose.connect(uri);

    // setup db
    var blogPostSchema = new mongoose.Schema({
      id: 'number',
      title: 'string',
      date: 'date',
      content: 'string'
    });

    var tagSchema = new mongoose.Schema({
      id: 'number',
      name: 'string'
    });

    var BlogPost = mongoose.model('BlogPost', blogPostSchema);
    var Tag = mongoose.model('Tag', tagSchema);

//};