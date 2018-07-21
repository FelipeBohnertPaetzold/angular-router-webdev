app.service('eventosService', function($http) {
  const BASE = 'http://localhost:3000'

  this.list = function(callback) {
    $http.get(`${BASE}/eventos`).then(function(res) {
      return callback(null, res.data)
    }, callback)
  }

  this.one = function(id, callback) {
    $http.get(`${BASE}/eventos/${id}`).then(function(res) {
      return callback(null, res.data)
    }, callback)
  }

  this.save = function(data, callback) {
    var urlEventos = `${BASE}/eventos`
    if (data.id) {
      urlEventos = `${urlEventos}/${nota.id}`
    }
    $http({
      url: urlEventos,
      method: data.id ? 'PUT' : 'POST',
      data
    }).then(function(res) {
      callback(null, res.data)
    }, callback)
  }
})
