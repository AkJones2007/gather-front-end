var render = {

  user: function() {
    if(user.current) {
      $('#login-register-view').hide();
      $('#dashboard-welcome').text('Welcome, ' + user.profile.fname);
    }
  },

  myProfile: function() {
    if(user.profile) {
      $('#dashboard-content').empty();

      var template = Handlebars.compile($('#user-profile-component').html());
      var content = template(user.profile);
      $('#dashboard-content').html(content);
    }
  },

  myGatherings: function() {
    if(user.gatherings) {
      $('#dashboard-content').empty();

      var template = Handlebars.compile($('#gatherings-list-component').html());
      var content = template({gatherings: user.gatherings});
      $('#dashboard-content').html(content);

      $('#create-gathering-button').on('click', function(event) {
        event.preventDefault();
        render.createGathering();
      });
    }
  },

  createGathering: function() {
    if(user.current) {
      $('#dashboard-content').empty();

      var template = Handlebars.compile($('#create-gathering-component').html());
      console.log(template);

      var content = template({});
      console.log(content);

      $('#dashboard-content').html(content);

      $('#gathering').on('submit', function(event) {
        event.preventDefault();
        gathering.create();
      });
    }
  },


}
