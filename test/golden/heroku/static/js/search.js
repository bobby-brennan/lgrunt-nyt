console.log('set ctrler');
app.controller('searchController', function($scope) {
  console.log('controller loading');
  $scope.inputs = {
    q: 'obama',
    page: 0
  };
  $scope.loadData = function(inputs) {
    console.log('loading data:' + JSON.stringify(inputs));
    $.ajax({
      url: 'search',
      type: 'post',
      contentType: "application/json; charset=utf-8",      
      data: JSON.stringify(inputs)
    })
    .done(function(data) {
      $scope.result = JSON.parse(data);
      console.log('data:' + JSON.stringify($scope.result.response.docs[0]));
      $scope.$apply();
    })
    .fail(function(err) {
       console.log('Error loading data:' + JSON.stringify(err));
    })
  }

  $scope.getPages = function() {
    var page = $scope.inputs.page;
    var pages = [1, 2, 3, 4, 5];
    if (page < 3) {
      return [1, 2, 3, 4, 5];
    } else {
      return pages.map(function(d) { return d + page - 2 });
    }
  }
})
