// This file defines click handlers
$(function() {

  $('#submit-registration').on('click', function(event) {
    event.preventDefault();
    user.register();
  });

  $('#login').on('submit', function(event) {
    event.preventDefault();
    user.login();
  });

  $('#gathering').on('submit', function(event) {
    event.preventDefault();
    gathering.create();
  });

});
