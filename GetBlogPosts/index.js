module.exports = function (context, req) {

    var mongoose = require('mongoose');

    context.log('JavaScript HTTP trigger function processed a request.');

var tags = [{
  "id": 1,
  "type": "tag",
  "attributes": {
    "name": "Development"
  }
},
{
  "id": 2,
  "type": "tag",
  "attributes": {
    "name": "Ember"
  }
}];

var blogPosts = [
{
  "id": 1,
  "type": "blog-post",
  "attributes": {
    "title": "An introduction to Ember",
    "content": "Recently I undertook a project which required the usage of Ember.js; after using Ember for a few weeks I decided to write a series of articles explaining the basics of Ember. These articles outline the key aspects of the framework and how to use them in anger.\n##What is Ember.js\n According to the [Ember Website](http://emberjs.com/) Ember is a framework for created ambitious web apps. Ember is a free, open source, opinionated JavaScript framework. It includes a set of tools &amp; components which allow you to conduct front end development in a consistent manner. \n###Aspects \nEmber offers the following functionality out of the box: \n- Routing \n- Components &amp; Templating \n- Data Access &amp; Stores \n- Testing \nBeing open source, Ember also offers many plugins and components which can be `npm install`ed. A search on [NPM](https://www.npmjs.com/search? q=ember) for `ember` returns 4203 results. \nSome examples which I've used include successfully in projects include: \n- Ember validations \n- Ember leaflet \n- Select2 \n- Ember-cli \n###Ember-CLI\n Ember also has a partner in crime [Ember-CLI](https://ember-cli.com/). Ember-CLI is an NPM package which works with ember to allow additional command line functionality. It allows you to perform commands such as: \n- `ember new/init` \n- to setup your project structure \n- `ember generate <component> <name>` \n- to add components, routes, models etc These CLI commands ensure your project retains a standard layout and structure so that it's easy to pick up for new developers. \nThe default Ember project structure looks like this: //TODO: Insert image of folder structure \n####Heavyweight?\n When working with **Node.JS** and related tooling the first few times, the setup and configuration of an effective build setup is far from painless. There are literally hundreds of plugins which perform all types of functions. Whilst this is very flexible, it can also be very frustrating and time consuming to create a workflow which matches your requirements. \nThe project structure may look quite verbose, but it offers a lot out of the box. \n- A development server. \n- Template compilation. \n- JavaScript and CSS minification. \n- ES2015 features via Babel. \nThe default template runs via Node and includes within the `package.json` three default scripts: \"scripts\": { \"build\": \"ember build\", \"start\": \"ember server\", \"test\": \"ember test\" } These allow you to begin working on your project immediately without worrying about needing to download a set of Node packages which may or may not work together. \n###`ember generate`\n Ember allows you to easily generate aspects of your application using in built blueprints. These include template test files and ensure naming conventions are adhered to and standard folder structure maintained.",
    "date": "2016-01-01"
  },
  "relationships": {
    "tags": {"data": [{ "id": 1, "type": "tag" }, { "id": 2, "type": "tag" }]}
  }
},
{
    "id": 2,
    "type": "blog-post",
    "attributes": {
        "title": "Another blog post",
        "content": "###Brief beef\nTail t-bone cow, pork chop tongue swine filet mignon pancetta brisket. Bacon short loin swine venison flank ground round doner spare ribs. Alcatra pastrami brisket tenderloin, biltong beef pork belly spare ribs sausage pork loin andouille swine hamburger. Short loin kevin meatloaf cow, tri-tip porchetta sausage doner pork belly hamburger rump pastrami. Meatloaf brisket short ribs kevin andouille sirloin filet mignon short loin tri-tip corned beef beef ribs salami prosciutto. Ground round venison kielbasa, short loin ham chuck pork.\n####Section 2\nSome more paragraph text.\n<img class=\"materialboxed\" width=\"650\" src=\"http://weknowyourdreams.com/images/cactus/cactus-08.jpg\">",
        "date": "2016-02-02"
    },
    "relationships": {
        "tags": {
            "data": [{ "id": 2, "type": "tag" }]
        }
    }
}
];


var uri = 'mongodb://dougajmcdonald:SeatCupra51@ds056559.mlab.com:56559/dougmcdonald';
var db = mongoose.connect(uri);

// setup db
var blogPostSchmea = new mongoose.Schema({
	id: 'number',
	title: 'string',
	date: 'date',
	content: 'string'
});

var tagSchema = new mongoose.Schema({
	id: 'number',
	name: 'string'
});

var BlogPost = mongoose.model('BlogPost', blogPostSchmea);
var Tag = mongoose.model('Tag', tagSchema);

context.log('Adding blog posts...')
for(var i = 0; i < blogPosts.length; i++) {
	var post = blogPosts[i];
	//console.log('adding ', blogPosts[i]);

	BlogPost.findOneAndUpdate({ 'id': post.id }, {
		id: post.id,
		title: post.attributes.title,
		date: post.attributes.date,
		content: post.attributes.content
	}, {
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	}).then(function(res) {
		//console.log(res);
	});
}
context.log('done.');

context.log('Adding tags...');
for(var i = 0; i < tags.length; i++) {
	var tag = tags[i];

	Tag.findOneAndUpdate({ 'id': tag.id }, {
		id: tag.id,
		name: tag.attributes.name
	}, {
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	}).then(function(res) {
    //console.log(res);
	});
}
console.log('done.');


	BlogPost.find({}).then(function(data) {
		context.res.body(data);
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