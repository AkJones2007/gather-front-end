var render = {

  handlebars: function(data, component) {
    $('dashboard-content').empty();
    var componentID = '#' + component + '-component';
    var template = Handlebars.compile($(componentID).html());
    var content = template(data);
    $('#dashboard-content').html(content);
  },

  user: function() {
    if(user.current) {
      $('#login-register-view').hide();
      $('#dashboard-welcome').text('Welcome, ' + user.profile.fname);
    }
  },

  myProfile: function() {
    var profile = user.profile;
    if(profile) {
      render.handlebars(profile, 'user-profile');
    }
  },

  myGatherings: function() {
    request.get('profile/gatherings', function(error, data) {
      var gatherings = {gatherings: data.gatherings};

      render.handlebars(gatherings, 'gatherings-list');

      handler.button('view-gathering', function(gatheringID) {
        render.viewGathering(gatheringID);
      });

      handler.button('create-gathering', function() {
        render.createGathering();
      });

      handler.button('edit-gathering', function(gatheringID) {
        render.editGathering(gatheringID);
      });

      handler.button('remove-gathering', function(gatheringID) {
        gathering.remove(gatheringID);
      });
    });
  },

  createGathering: function() {
    if(user.current) {
      render.handlebars({}, 'create-gathering');

      handler.submit('gathering', function() {
        gathering.create();
      });
    }
  },

  viewGathering: function(id) {
    var path = 'gatherings/' + id;
    request.get(path, function(error, data) {
      render.handlebars(data.gatherings, 'single-gathering');
      handler.button('gatherings-back', function() {
        render.myGatherings();
      });
      handler.button('edit-gathering', function() {
        render.editGathering();
      });
    });
  },

  editGathering: function(id) {
    var path = 'gatherings/' + id;
    request.get(path, function(error, data) {
      render.handlebars(data.gatherings, 'edit-gathering');
      handler.submit('gathering-update', function() {
        gathering.update(id);
      });
    });
  }

}
