var gathering = {

  create: function() {
    var gatheringData = utility.formToObject($('#gathering'));
    var gathering = utility.wrapObject('gathering', gatheringData);

    request.post('gatherings', gathering, function(error, data) {
      user.setAttribute('gatherings');
      $('#dashboard-content').html('Gathering Created!');
      setTimeout(function() {
        render.myGatherings();
      }, 500);
    });


  }

}
