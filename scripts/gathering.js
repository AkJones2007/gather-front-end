var gathering = {

  create: function() {
    var gatheringData = utility.formToObject($('#gathering'));
    var gathering = utility.wrapObject('gathering', gatheringData);

    request.post('gatherings', gathering, function(error, data) {
      $('#results').html(JSON.stringify(data));
      user.setAttribute('gatherings');
    });
  }

}
