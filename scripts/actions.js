$(function() {

  // Initialize
  $('.modal-background').hide();

  // Login/Register
  $('.login-button').on('click', function(event) {
    event.preventDefault();
    $('.modal-background').show('fade');
    $('#login').show();
    $('#register').hide();
    $('#profile').hide();
  });

  $('.register-button').on('click', function(event) {
    event.preventDefault();
    $('.modal-background').show('fade');
    $('#login').hide();
    $('#register').show();
    $('#profile').show();
  });

  $('#login').on('submit', function(event) {
    event.preventDefault();
    user.login();
  });

  $('.registration-submit-button').on('click', function(event) {
    event.preventDefault();
    user.register();
  });

  $('.modal-cancel').on('click', function(event) {
    event.preventDefault();
    $('.modal-background').hide('fade');
  })

  // Dashboard Navigation
  $('#dashboard-profile').on('click', function(event) {
    event.preventDefault();
    render.myProfile();
  });

  $('#dashboard-gatherings').on('click', function(event) {
    event.preventDefault();
    render.myGatherings();
  });

  $('#dashboard-friends').on('click', function(event) {
    event.preventDefault();
    render.friendList();
  });

  $('#dashboard-friend-requests').on('click', function(event) {
    event.preventDefault();
    render.friendRequests();
  });

  $('#dashboard-invitations').on('click', function(event) {
    event.preventDefault();
    render.userInvitations();
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
