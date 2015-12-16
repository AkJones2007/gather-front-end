// This file handles all things related to the user model
var user = {

  current: null,

  setProfile: function() {
    request.get('profile', function(error, data) {
      user.profile = data;
      render.user();
      render.myProfile();
    });
  },

  setAttribute: function(attribute) {
    var path = 'profile/' + attribute;
    request.get(path, function(error, data) {
      user[attribute] = data[attribute];
    });
  },

  setFriendRequests: function() {
    var path = 'profile/friend-requests';
    request.get(path, function(error, data) {
      user.friendRequests = data.friends;
    });
  },

  register: function() {
    var userData = utility.formToObject($('#register'));
    var profileData = utility.formToObject($('#profile'));
    var credentials = utility.wrapObject('credentials', userData);

    request.post('register', credentials, function(error, data) {
      profileData.user_id = data.user.id;
      var profile = utility.wrapObject('profile', profileData);
      $('#results').append(JSON.stringify(data));

      request.post('profile', profile, function(error, data) {
        $('#registration').hide();
        $('#login').show();
      });
    });
  },

  login: function() {
    var loginData = utility.formToObject($('#login'));
    var credentials = utility.wrapObject('credentials', loginData);

    request.post('login', credentials, function(error, data) {
      user.current = data.user;
      user.setProfile();
      user.setAttribute('friends');
      user.setFriendRequests();
      user.setAttribute('gatherings');
      user.setAttribute('invitations');
    });
  }

};
