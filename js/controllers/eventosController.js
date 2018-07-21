app.controller('eventosController', function(
  $scope,
  $rootScope,
  eventosService
) {
  $scope.list = []
  $scope.evento = {}

  $scope.getList = function() {
    $rootScope.error = ''
    eventosService.list(function(err, data) {
      if (err) {
        $rootScope.error = err.message
        return
      }
      $scope.list = data
    })
  }

  $scope.save = function() {
    $rootScope.error = ''
    eventosService.save($scope.evento, function(err) {
      if (err) {
        $rootScope.error = err.message
        return
      }

      return (location.href = '/#!/')
    })
  }

  $scope.getList()
})
