'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
  $('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $('.carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
 }
