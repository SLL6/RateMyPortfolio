var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
	"email": String,
	"password": String,
	"name": String,
  "projects": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Project'}],
  "ratings": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
})

exports.User = Mongoose.model('User', UserSchema);

var RatingSchema = new Mongoose.Schema({
	"project": {type: Mongoose.Schema.Types.ObjectId, ref: 'Project'},
	"values": [Number],
	"comment": String
});

exports.Rating = Mongoose.model('Rating', RatingSchema);

var ProjectSchema = new Mongoose.Schema({
  "title": String,
  "author": String,
  "description": String,
  "projectURL": String,
  "criteria": [String],
  "ratings": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
});

exports.Project = Mongoose.model('Project', ProjectSchema);
