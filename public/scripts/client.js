/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    //sort tweets according to time
    tweets.sort((a, b) => b.created_at - a.created_at );
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.all-tweets').append($tweet);
    }
  }

  const createTweetElement = function(data) {
    /* the other way to prevent XSS without escaping function
    // const text = $("<div>").text(data.content.text);
    // console.log(text,text.text());
    */
    const item = 
      `<section class="tweet-messages">
        <article>
          <header>
            <div>
              <i class="fa-solid fa-face-grin-stars"></i>
              <p class="name">${data.user.name}</p>
            </div>
            <p class="id_tweeted">${data.user.handle}</p>
          </header>
          <div class="tweet__message">
            <p>${escape(data.content.text)}</p>
          </div>
          <footer>
            <p class="date_tweeted">${timeago.format(data.created_at)}</p>
            <div>
              <a href="#" class="fa-solid fa-flag"></a>
              <a href="#" class="fa-solid fa-rotate"></a>
              <a href="#" class="fa-solid fa-heart"></a>
            </div>
          </footer>
        </article>
      </section>`

      return item;
  }
 
  const loadTweets = function() {
    //clear the previous tweets list
    $(".all-tweets").empty();
    $.getJSON('/tweets')
    .then((data) => {
      renderTweets(data);
    })
  }
  //first data load
  loadTweets();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $("#tweet_submit").on('submit', function(evt) {
    evt.preventDefault();
    
    const $tweetText = $('#tweet-text');

    if ($tweetText.val().length === 0) {
      const $error = $('.error');
      $error.addClass('shortError');
      $error.text("Your tweet is empty!🤭");
      $error.slideDown("slow");
    } else if ($tweetText.val().length > 140) {
      const $error = $('.error')
      $error.addClass('longError');
      $error.text("Your tweet is too long!🧐");
      $error.slideDown("slow");
    } else {
      $.post("/tweets", $tweetText.serialize())
      //tweet textarea clear out & reset counter
      .then(() => {
        $tweetText.val('');
        $('.counter').text(140);
      })
      .then(loadTweets);
    }

    //remove the error message when counter is between 0 to 140
    $("#tweet-text").on('keyup', function() {
      let counter = $('.counter');
      counter.text(140 - $(this).val().length);
      if (counter.text() >= 0) {
        const $error = $('.error');
        $error.removeClass('shortError');
        $error.text("");
        $error.removeClass('longError');
      }
    })
  })

})