'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
  $('#carousel1').slick({
    infinite: true,
    slidesToShow: 3,
    swipeToScroll: true
  });

  $('#carousel2').slick({
    infinite: true,
    slidesToShow: 1,
    swipeToScroll: true
  });
}