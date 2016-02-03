'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  /*$("#login").click(function(e) {
    $.get("/login").
      success(function(data) {
        console.log("should be at login");
      }).
      error(function(data) {
        console.log("ugh");
      });
  })*/

   /*function projectClick(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();

    // In an event listener, $(this) is the leement that fired the event
    var projectTitle = $(this).find("p").text();
    var jumbotronHeader = $(".jumbotron h1");
    jumbotronHeader.text(projectTitle);

    //dynamically update description
    var containingProject = $(this).closest(".project");
    var description = $(containingProject).find(".project-description");
    if (description.length == 0) {
     $(containingProject).append("<div class='project-description'><p>Description of the project.</p></div>");
   } else {
     description.toggle();
   }*/
 }