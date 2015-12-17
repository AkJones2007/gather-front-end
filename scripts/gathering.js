var gathering = {

  create: function() {
    var gatheringData = utility.formToObject($('#gathering'));
    var gathering = utility.wrapObject('gathering', gatheringData);
    console.log(gatheringData);

    request.post('gatherings', gathering, function(error, data) {
      user.setAttribute('gatherings');
      $('#dashboard-content').html('Gathering Created!');
      setTimeout(function() {
        render.myGatherings();
      }, 500);
    });
  },

  update: function(id) {
    var gatheringData = utility.formToObject($('#gathering-update'));
    var gathering = utility.wrapObject('gathering', gatheringData);
    console.log(gathering);
    var path = 'gatherings/' + id;

    request.patch(path, gathering, function(error, data) {
      $('#dashboard-content').html('Gathering Updated!');
      setTimeout(function() {
        user.setAttribute('gatherings');
        render.viewGathering(id);
      }, 500);
    });
  },

  remove: function(id, element) {
    var path = 'gatherings/' + id;
    request.destroy(path, function(error, data) {
      $("li[data-id=" + id + "]").hide();
      render.myGatherings();
    });
  }

}
