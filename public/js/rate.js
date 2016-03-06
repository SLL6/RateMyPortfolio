'use strict';
var rating0 = 0;
var rating1 = 0;
var rating2 = 0;
var rating3 = 0;
var comment = 0;
var progress = 0;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
 	$('.carousel1').slick({
 		infinite: true,
 		slidesToShow: 1,
 		swipeToScroll: true,
 		dots: true
 	});

 	$('.carousel2').slick({
 		infinite: false,
 		slidesToShow: 1,
 		swipeToScroll: true,
 	});
  // On before slide change
  $('.star--0').change(function() {
  	updateProgress(0);
  });
  $('.star--1').change(function() {
  	updateProgress(1);
  });
  $('.star--2').change(function() {
  	updateProgress(2);
  });
  $('.star--3').change(function() {
  	updateProgress(3);
  });

  $('#subRate1').click(function () {
  	logRating(1);
  });

  $('#subRate2').click(function () {
  	logRating(2);
  });
}

function updateProgress(index) {
	console.log("update! " + index)
	switch (index) {
		case 0:
		if ($('.star--0').value != rating0) {
			progress = progress + 25;
			rating0 = $('.star--0').value;
		}
		break;
		case 1:
		if ($('.star--1').value != rating1) {
			progress = progress + 25;
			rating1 = $('.star--1').value;
		}
		break;
		case 2:
		if ($('.star--2').value != rating2) {
			progress = progress + 25;
			rating2 = $('.star--2').value;
		}
		break;
		case 3:
		if ($('.star--3').value != rating3) {
			progress = progress + 25;
			rating3 = $('.star--3').value;
		}
		break;
		case 4:
		if (comment != 1) {
			progress = progress + 25;
			comment = 1;
		}
	}
	$(".progress-bar").attr('style', "width: " + progress + "%");
	$(".progress-bar").attr('aria-valuenow', progress);
	$(".progress-bar").text(progress+"%");
}

function logRating(variation) {
	var type = variation == 1 ? 'rating1' : 'rating2';
	ga('send','event',type,'submit');
	if (rating0 == 0) {
		ga('send','event',type,'no1');
	}
	if (rating1 == 0) {
		ga('send','event',type,'no2');
	}
	if (rating2 == 0) {
		ga('send','event',type,'no3');
	}
	if (rating3 == 0) {
		ga('send','event',type,'no4');
	}
}