var friend = {

  search: function() {
    var query = $('#dashboard-search-query').val();
    request.get('profiles/search/' + query, function(error, data) {
      console.log(data);
      render.profileSearchResults(data);
    });
  },

  add: function() {

  }

}
