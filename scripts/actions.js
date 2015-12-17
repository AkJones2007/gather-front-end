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

  $('#dashboard-search-button').on('click', function(event) {
    event.preventDefault();
    friend.search();
  });

  $('#dashboard-search-query').keyup(function() {
    friend.search();
  });

});

var handler = {

  button: function(name, callback) {
    var buttonClass = '.' + name + '-button';
    $(buttonClass).on('click', function(event) {
      event.preventDefault();
      var dataID = $(this).attr('data-id');
      callback(dataID);
    });
  },

  submit: function(name, callback) {
    $('#' + name).on('submit', function(event) {
      event.preventDefault();
      callback();
    });
  }

};
