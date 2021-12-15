$(document).ready(function() {
  
  $("#tweet-text").on('keyup', function() {
    let counter = $('.counter');
    counter.text(140 - $(this).val().length);

    if (counter.text() < 0) {
      // counter.css("color", "red");
      $('.counter').addClass('changeColor');

    } else {
      // counter.css("color", "#545149");
      $('.counter').removeClass('changeColor');
    }
  })
  
})