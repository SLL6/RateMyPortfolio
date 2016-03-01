
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'rated';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var data_json = require('./data.json');
var accounts_json = data_json['accounts'];
var projects_json = data_json['projects'];

// Step 2: Remove all existing documents
models.Project
  .find()
  .remove()
  .exec(onceClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count_proj = projects_json.length;
  for(var i=0; i<projects_json.length; i++) {
    var json = projects_json[i];
    var proj = new models.Project(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count_proj--;
      console.log(to_save_count_proj + ' projects left to save');
      if(to_save_count_proj <= 0 && to_save_count_accounts <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }

  var to_save_count_accounts = accounts_json.length;
  for(var i=0; i<accounts_json.length; i++) {
    var json = accounts_json[i];
    var user = new models.User(json);

    user.save(function(err, user) {
      if(err) console.log(err);

      to_save_count_accounts--;
      console.log(to_save_count_accounts + ' users left to save');
      if(to_save_count_proj <= 0 && to_save_count_accounts <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
}

