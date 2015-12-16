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

  get: function(path, callback) {
    api.ajax({
      method: 'GET',
      url: api.url + path,
      headers: this.authorize() || null,
      dataType: 'json'
    }, callback);
  },

  post: function(path, data, callback) {
    api.ajax({
      method: 'POST',
      url: api.url + path,
      headers: this.authorize() || null,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  update: function(path, data, callback) {
    api.ajax({
      method: 'PATCH',
      url: api.url + path,
      headers: this.authorize() || null,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(portion),
      dataType: 'json'
    }, callback);
  },

  destroy: function(path, id, callback) {
    api.ajax({
      method: 'DELETE',
      url: api.url + path + id,
      headers: this.authorize() || null
    }, callback);
  }

};
