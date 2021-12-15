/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.container').append($tweet);
    }
  }

  const createTweetElement = function(data) {
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
            <p>${data.content.text}</p>
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

  // const $tweet = createTweetElement(tweetData);
  // console.log($tweet);
  // $('.container').append($tweet);
  const loadTweets = function() {
    $.getJSON('/tweets')
    .then((data) => {
      // console.log(data);
      // for (const elem of data) {
      //   const tweet = createTweetElement(elem);
      //   $('.container').append(tweet);
      // }
      renderTweets(data);
    })
  }
  loadTweets();

  $("#tweet_submit").on('submit', function(evt) {
    evt.preventDefault();
    // console.log(evt);
    const $tweetText = $('#tweet-text');
    // console.log($tweetText.serialize());
    if ($tweetText.val().length === 0) {
      alert('Your tweet is empty!')
    } else if ($tweetText.val().length > 140) {
      alert('Your tweet is too long!')
    } else {
      $.post("/tweets", $tweetText.serialize());
    }
  })
  

})



