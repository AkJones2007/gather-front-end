// This file handles all things related to the user model
var user = {

  register: function() {
    var userData = utility.formToObject($('#register'));
    var profileData = utility.formToObject($('#profile'));
    var credentials = utility.wrapObject('credentials', userData);

    request.post('register', credentials, function(error, data) {
      profileData.user_id = data.user.id;
      var profile = utility.wrapObject('profile', profileData);
      $('#results').append(JSON.stringify(data));

      request.post('profile', profile, function(error, data) {
        $('#results').append(JSON.stringify(data));
      });
    });
  }

};
