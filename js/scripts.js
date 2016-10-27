var wWidth, oldWidth, newWidth;

$(document).ready(function() {
  wWidth = $(window).width();
});

$(document).resize(function() {
  wWidth = $(window).width();
});

/* Called on right arrow click */
function displayAbout() {
  $(".left-arrow-return").css({display: "inline"});
  // fade out center box
  $(".center-box-wrapper").animate({
    opacity: "0",
    left: "25%",
    "margin-left": $(".center-box-wrapper").width()/2
  });

  // translate about me frame and show button
  setTimeout(function () {
    $(".aboutme-wrapper").css({display: "block"});
    $(".aboutme-wrapper").animate({
      opacity: "1",
      left: "50%",
      "margin-left": -$(".aboutme-wrapper").width()/2
    });
  }, 250);
  setTimeout(function () {
    $(".left-arrow-return").animate({opacity: 1});
    $(".left-arrow-return").prop("disabled", false);
  }, 650);
}

/* Called to return to main layout from aboutme */
function hideAbout() {
  $(".left-arrow-return").animate({opacity: 0});
  $(".left-arrow-return").prop("disabled", true);
  // fade out about me frame
  $(".aboutme-wrapper").animate({
    opacity: "0",
    left: "0",
    "margin-left": "0"
  });
  // return center box
  setTimeout(function () {
    $(".center-box-wrapper").animate({
      opacity: "1",
      left: "0",
      "margin-left": "0"
    });
  }, 250);
  setTimeout(function () {
    $(".aboutme-wrapper").css({display: "none"});
    $(".left-arrow-return").css({display: "none"});
  }, 800);
}

/* Called on left arrow click */
// FIXME doesn't center if screen resizes. just takes some time to fix
function displayBostaff() {
  // fade out center box
  $(".right-arrow-return").css({display: "inline"});
  $(".center-box-wrapper").animate({
    opacity: "0",
    right: "25%",
    "margin-right": $(".center-box-wrapper").width()/2
  });

  setTimeout(function () {
    $(".bostaff-wrapper").css({display: "block"});
    $(".bostaff-wrapper").animate({
      opacity: "1",
      right: "50%",
      "margin-right": wWidth/2 - $(".bostaff-wrapper").width()/2
    });
  }, 250);
  setTimeout(function () {
    $(".right-arrow-return").animate({opacity: 1});
    $(".right-arrow-return").prop("disabled", false);
  }, 650);
}

/* Called to return from bostaff to main view */
function hideBostaff() {
  $(".center-box-wrapper").css({display: "block"});
  $(".right-arrow-return").animate({opacity: "0"});
  $(".right-arrow-return").prop("disabled", true);
  // fade frame
  $(".bostaff-wrapper").animate({
    opacity: "0",
    right: "0%",
    "margin-right": "0"
  });
  //return center box
  setTimeout(function () {
    $(".center-box-wrapper").animate({
      opacity: "1",
      right: "0%",
      "margin-right": "0"
    });
  }, 250);
  setTimeout(function () {
    $(".bostaff-wrapper").css({display: "none"});
    $(".right-arrow-return").css({display: "none"});
  }, 800);
}


function displayProjects() {
  $(".projects-wrapper").css({display: "inline"});
  $(".center-box-wrapper").animate({
    opacity: "0",
    top: "25%",
    "margin-top": $(".center-box-wrapper").height()/2
  });
  setTimeout(function () {
    $(".projects-wrapper").animate({
      opacity: "1",
    });
  }, 450);
  setTimeout(function () {
    $(".up-arrow-return").css({display: "inline"});
    $(".up-arrow-return").animate({opacity: 1});
    $(".up-arrow-return").prop("disabled", false);
  }, 800);
}

function hideProjects() {
  $(".center-box-wrapper").css({display: "block"});
  $(".up-arrow-return").animate({opacity: "0"}, "fast");
  $(".projects-wrapper").animate({
    opacity: "0",
  }, "slow");
  setTimeout(function () {
    $(".center-box-wrapper").animate({
      opacity: "1",
      top: "0%",
      "margin-top": "0%"
    });
  }, 450);
  setTimeout(function () {
    $(".projects-wrapper").css({display: "none"});
    $(".up-arrow-return").css({display: "none"});
  }, 800);
}
