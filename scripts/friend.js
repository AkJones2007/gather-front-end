var friend = {

  search: function() {
    var query = $('#dashboard-search-query').val();
    request.get('profiles/search/' + query, function(error, data) {
      console.log(query);
      render.profileSearchResults(data);
    });
  }

}
