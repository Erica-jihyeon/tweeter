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
    // const text = $("<div>").text(data.content.text);
    // console.log(text,text.text());
    console.log(data.content.text)
    console.log(escape(data.content.text))
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

  // const $tweet = createTweetElement(tweetData);
  // console.log($tweet);
  // $('.container').append($tweet);
  const loadTweets = function() {
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
      alert('Your tweet is empty!')
    } else if ($tweetText.val().length > 140) {
      alert('Your tweet is too long!')
    } else {
      $.post("/tweets", $tweetText.serialize())
      //tweet textarea clear out & reset counter
      .then(() => {
        $tweetText.val('');
        $('.counter').text(140);
      })
      .then(loadTweets);
    }
  })
  

})



//<script>alert('uh oh!);</script>