app.controller('eventosController', function(
  $scope,
  $rootScope,
  $routeParams,
  eventosService
) {
  $scope.list = []
  $scope.evento = {}

  if ($routeParams.id) {
    eventosService.one($routeParams.id, function(err, data) {
      if (err) return alert(JSON.stringify(err))
      data.date = new Date(data.date)
      $scope.evento = data
    })
  }

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

  $scope.remove = function(id) {
    $rootScope.error = ''
    eventosService.remove(id, function(err) {
      if (err) {
        $rootScope.error = err.message
        return
      }
      const index = $scope.list.findIndex(function(item) {
        return item.id === id
      })

      if (index > -1) {
        $scope.list.splice(index, 1)
      }
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
