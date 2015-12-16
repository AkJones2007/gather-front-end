// This file defines click handlers
$(function() {

  // Login and Register
  $('#registration').hide();

  $('#show-registration').on('click', function(event) {
    event.preventDefault();
    $('#login').hide();
    $('#registration').show();
  });

  $('#show-login').on('click', function(event) {
    event.preventDefault();
    $('#registration').hide();
    $('#login').show();
  });

  $('#submit-registration').on('click', function(event) {
    event.preventDefault();
    user.register();
  });

  $('#login').on('submit', function(event) {
    event.preventDefault();
    user.login();
  });

  // Dashboard Navigation
  $('#dashboard-profile').on('click', function(event) {
    event.preventDefault();
    render.myProfile();
  });

  $('#dashboard-gatherings').on('click', function(event) {
    event.preventDefault();
    render.myGatherings();
  });

});
