var render = {

  login: function(show) {
    if (show) {
      $('.modal-background').show();
      $('#login').show();
    } else {
      $('.modal-background').hide();
      $('#login').hide();
    }
  },

  register: function(show) {
    if (show) {
      $('.modal-background').show();
      $('#register').show();
      $('#profile').show();
    } else {
      $('.modal-background').hide();
      $('#register').hide();
      $('#profile').hide();
    }
  },

  handlebars: function(data, component) {
    $('dashboard-content').empty();
    var componentID = '#' + component + '-component';
    var template = Handlebars.compile($(componentID).html());
    var content = template(data);
    $('#dashboard-content').html(content);
  },

  modal: function(name, hidden) {
    if (hidden) {
      $('.modal-background').hide();
      $('#' + name).hide();
    } else {
      $('.modal-background').show();
      $('#' + name).show();
    }
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
    $('.back-button').hide();
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
      handler.button('gatherings-back', function() {
        render.myGatherings();
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
        render.editGathering(id);
      });
      handler.button('remove-gathering', function(gatheringID) {
        gathering.remove(gatheringID);
      });
      handler.button('show-friend-invites', function(gathID) {
        request.get('profile/friends', function(error, data) {
          render.handlebars(data, 'invite-friends');
          handler.button('invite-friend', function(id) {
            var path = 'gatherings/' + gathID + '/invites';
            var data = utility.wrapObject('invitation', {profile_id: id})
            request.post(path, data, function() {
              $('#dashboard-content').html('Invitation sent!');
              setTimeout(function() {
                render.viewGathering(gathID);
              }, 750);
            });
          });
        })
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
      handler.button('gatherings-back', function() {
        render.myGatherings();
      });
    });
  },

  profileSearchResults: function(results) {
    render.handlebars(results, 'profile-search-results');

    handler.button('view-profile', function(id) {
      var path = 'profiles/' + id;
      request.get(path, function(error, data) {
        render.handlebars(data, 'other-user-profile');
      });
    });

    handler.button('add-friend', function(id) {
      var friendID = Number(id);
      var friendData = utility.wrapObject('friend', {user_id: friendID});

      request.post('friends', friendData, function(error, data) {
        $('#dashboard-content').html('Friend request sent!');
        setTimeout(function() {
          render.profileSearchResults(results);
        },750);
      });
    });
  },

  friendList: function() {
    request.get('profile/friends', function(error, data) {
      render.handlebars(data, 'list-friends');
      $('.add-friend-button').hide();
      handler.button('view-profile', function(id) {
        var path = 'profiles/' + id;
        request.get(path, function(error, data) {
          render.handlebars(data, 'other-user-profile');
          handler.button('back', function() {
            render.friendList();
          });
        });
      });

      handler.button('remove-friend', function(id) {
        var path = 'friends/' + id;
        request.destroy(path, function() {
          $('#dashboard-content').html('Friend removed!');
          setTimeout(function() {
            render.friendList();
          },750);
        });
      });

    });
  },

  friendRequests: function() {
    request.get('profile/friend-requests', function(error, data) {
      render.handlebars(data, 'list-requests');

      handler.button('view-profile', function(id) {
        var path = 'profiles/' + id;
        request.get(path, function(error, data) {
          render.handlebars(data, 'other-user-profile');
          handler.button('back', function() {
            render.friendRequests();
          });
        });
      });

      handler.button('accept-request', function(id) {
        var path = 'friends/' + id;
        request.patch(path, { friend: { accepted: true } }, function(error, data) {
          $('#dashboard-content').html('Friend request accepted!');
          setTimeout(function() {
            render.friendRequests();
          },750);
        });
      });

      handler.button('decline-request', function(id) {
        var path = 'friends/' + id;
        request.destroy(path, function() {
          $('#dashboard-content').html('Friend request declined!');
          setTimeout(function() {
            render.friendRequests();
          },750);
        });
      });

    });
  },

  userInvitations: function() {
    request.get('profile/invitations', function(error, data) {
      render.handlebars(data, '')
    });
  }

}
