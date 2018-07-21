const app = angular.module('eventos', ['ngRoute'])

app.run(function($rootScope) {
  $rootScope.loggedUser = JSON.parse(localStorage.getItem('user'))
})

angular.module('eventos').factory('checkLogin', function() {
  return {
    request: function(config) {
      var url = config.url
      if (url.indexOf('auth') > -1) return config

      if (!localStorage.getItem('user')) {
        location.href = '/#!/auth/login'
      }

      return config
    }
  }
})

angular.module('eventos').config(function($httpProvider) {
  $httpProvider.interceptors.push('checkLogin')
})

app.config(function($routeProvider) {
  $routeProvider
    .when('/auth/login', {
      templateUrl: 'views/auth/Login',
      controller: 'authController'
    })
    .when('/auth/register', {
      templateUrl: 'views/auth/Register',
      controller: 'authController'
    })
    .when('/', {
      templateUrl: 'views/Home',
      controller: 'eventosController'
    })
    .when('/create', {
      templateUrl: 'views/Form',
      controller: 'eventosController'
    })
    .otherwise('/')
})
