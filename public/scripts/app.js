/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(function() {
  // This function creates a section tag with a new tweet box inside. Including
  // its header, content, footer and return that object
  function createTweetElement(tweetObject){
    let $tweet = $("<section>").addClass("newTweetBox");
    let returningHTML = "<div class=\"singleBox\"><header class=\"newTweetHeader\"><div class=\"imageContainer\">";

    returningHTML += "<img src=\"" + tweetObject.user.avatars.small + "\" class=\"newProfile\"></div><h2 class=\"newTweeth2\">" +
            tweetObject.user.name + "</h2><p class=\"newTweetId\">" + tweetObject.user.handle + "</p></header><article class=\"newTweetArticle\">" +
            "<p class=\"newTweetContent\">" + escape(tweetObject.content.text) + "</p></article><footer class=\"newTweetFooter\"><p class=\"newTweetPostTime\">"
             + moment(tweetObject.created_at).fromNow() +
            "</p><div class=\"hiddenIcons\"><i class=\"fas fa-flag\"></i><i class=\"fas fa-retweet\"></i><i class=\"fas fa-heart\"></i>" +
            "</div></footer></div>";

    // console.log(moment.toDate().fromNow());
    $tweet = $tweet.append(returningHTML);

    return $tweet;
  }

  // This render function takes in an array object and creates a div to contain
  // everything. This function calls createTweetElement and prepend them to the
  // whole html
  function renderTweets(tweetObjArr){
    let $div = $("<div></div>");
    tweetObjArr.forEach(element => {
      $div = $div.prepend(createTweetElement(element));
    });

    $(".newTweetBox").html($div);
  }

  // This function perform a ajax get request that upon sucess will render the current
  // tweet
  function loadTweets () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(tweet){
        renderTweets(tweet);
      },
      error: function(){
        console.error("ERROR FOUND.");
      }
    });
   }

  loadTweets(); // Calling lodaTweets


  // An on click event upon clicking ajax will perfrom a post with the data received
  // from the click event and and hide the togglable button
  $('input').on('click', function (event) {
    event.preventDefault();

    if($("#newTweet").val().length <= 0){
      $(".toggleMessage").text("You did not enter anything.");
      $(".toggleMessage").css("color", "red");
    } else if ($("#newTweet").val().length > 140){
      $(".toggleMessage").css("color", "red");
      $(".toggleMessage").text("You have entered more then 140 characters.");
    } else {
      $(".toggleMessage").text("");
      let data = $('form').serialize();
      $.ajax('/tweets', {
        method: 'POST',
        data: data
      }).done(function (data){
        $(".newTweetBox").load(loadTweets());
        $("form textarea").val("");
        $('section[id="toggle"]').hide();
        $(".counter").text("140");
      });
    }
  });


  // Setting default button to hide
  $('section[id="toggle"]').hide();

  // If button is clicked button will be showed through an animation and
  // textarea will be autofocused
  $("button").click( function () {
    $('section[id="toggle"]').slideToggle();
    $("textarea").focus();
  });

  // used for testing if user entered unsafe data
  function escape (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});





























