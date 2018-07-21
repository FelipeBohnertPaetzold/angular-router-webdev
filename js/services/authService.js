app.service('authService', function($http) {
  const BASE = 'http://localhost:3000'

  checkUser = function(name, callback) {
    $http.get(`${BASE}/users?name=${name}`).then(function(res) {
      if (res.data && res.data.length) {
        return callback(new Error('Usuário já existente'))
      }

      return callback()
    }, callback)
  }

  this.login = function(auth, callback) {
    $http.get(`${BASE}/users?name=${auth.name}`).then(function(res) {
      if (!res.data || !res.data.length) {
        return callback(new Error('Usuário não encontrado'))
      }

      const user = res.data[0]

      if (user.password !== auth.password) {
        return callback(new Error('Senha inválida'))
      }

      return callback(null, { name: user.name, id: user.id })
    })
  }

  this.register = function(register, callback) {
    checkUser(register.name, function(err) {
      if (err) {
        return callback(err)
      }

      $http.post(`${BASE}/users`, register).then(function(res) {
        callback(null, res.data)
      }, callback)
    })
  }
})
