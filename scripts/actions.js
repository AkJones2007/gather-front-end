// This file defines click handlers
$(function() {

  $('#submit-registration').on('click', function(event) {
    event.preventDefault();
    user.register();
  });

});
