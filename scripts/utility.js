var utility = {

  formToObject: function(form) {
    var object = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        object[$(this).attr('name')] = $(this).val();
      }
    });
    return object;
  },

  wrapObject: function(key, data) {
    var wrapped = {};
    wrapped[key] = data;
    return wrapped;
  }

}
