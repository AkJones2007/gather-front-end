// This file provides the framework for talking to the server
var api = {

  url: 'http://localhost:3000/',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  }

};

var request = {

  authorize: function() {
    if (user.current) {
      return {
        Authorization: "Token token=" + user.current.token
      }
    }
    return false;
  },

  get: function(path, callback, token) {
    api.ajax({
      method: 'GET',
      url: api.url + path,
      headers: {
        Authorization: "Token token=" + token
      },
      dataType: 'json'
    }, callback);
  },

  post: function(path, data, callback, token) {
    api.ajax({
      method: 'POST',
      url: api.url + path,
      headers: {
        Authorization: "Token token=" + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  update: function(path, data, callback, token) {
    api.ajax({
      method: 'PATCH',
      url: api.url + path,
      headers: {
        Authorization: "Token token=" + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(portion),
      dataType: 'json'
    }, callback);
  },

  destroy: function(path, id, callback, token) {
    api.ajax({
      method: 'DELETE',
      url: api.url + path + id,
      headers: {
        Authorization: "Token token=" + token
      }
    }, callback);
  }

};
