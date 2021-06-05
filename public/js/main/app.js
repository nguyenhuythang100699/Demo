let app = angular.module("app.shop", []);

app.controller("shopController", ['$scope', ($scope)=>{
    $scope.appName = "Shoes Shop Demo";
}]);