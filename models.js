var Mongoose = require('mongoose');

var RatingSchema = new Mongoose.Schema({
	"values": [Number],
	"comment": String
});

exports.Rating = Mongoose.model('Rating', RatingSchema);

var ProjectSchema = new Mongoose.Schema({
  "title": String,
  "author": String,
  "description": String,
  "projectURL": String,
  "imageURL": String,
  "criteria": [String],
  "ratings": [RatingSchema]
});

exports.Project = Mongoose.model('Project', ProjectSchema);
