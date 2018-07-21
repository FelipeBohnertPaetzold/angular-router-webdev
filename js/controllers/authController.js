app.controller('authController', function(
  $scope,
  $rootScope,
  authService,
  $timeout
) {
  $scope.newRegister = {}
  $scope.auth = {}

  $rootScope.loggedUser = JSON.parse(localStorage.getItem('user'))

  $scope.register = function() {
    $rootScope.error = ''
    if (
      $scope.newRegister.password !== $scope.newRegister.passwordConfirmation
    ) {
      return ($rootScope.error = 'Senhas não conferem')
    }

    delete $scope.newRegister.passwordConfirmation

    authService.register($scope.newRegister, function(err, data) {
      if (err) {
        $rootScope.error = err.message
        return
      }

      $rootScope.success = 'Conta criada com sucesso'
      $timeout(function() {
        $rootScope.success = ''
      }, 2000)
      window.location.href = '#!/auth/login'
    })
  }

  $scope.login = function() {
    $rootScope.error = ''
    authService.login($scope.auth, function(err, data) {
      if (err) {
        $rootScope.error = err.message
        return
      }

      $rootScope.loggedUser = data
      localStorage.setItem('user', JSON.stringify(data))
      window.location.href = '#!/'
    })
  }
})
