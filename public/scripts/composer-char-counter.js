$(document).ready(function() {
  // This js file is for counter the left characters can be put into the text box
  // if user entered more then 140 characters, countertext will turn red.
  let charCount = 140;
  $("#newTweet").on("input", function(event) {
    let updateTag = $(this).parent().children().children(".counter")[0];
    updateTag.textContent = charCount - Array.from(event.target.value).length;

    if(charCount - Array.from(event.target.value).length < 0){
      $(updateTag).css("color", "red");
    } else {
      $(updateTag).css("color", "black");
    }
  });
});