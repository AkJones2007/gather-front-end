var profile = {

  find: function(id, callback) {
    var path = 'profiles/' + id;
    request.get(path, function(error, data) {
      callback(error, data);
    });
  }

}
