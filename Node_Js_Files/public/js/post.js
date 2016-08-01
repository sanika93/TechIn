var app = angular.module("postApp",[]);
app.controller("createPostController", function($scope, $http){

  var config = {
  headers : {
      'Content-Type': 'application/json'
      }
  }

  $scope.addPostFunc = function(){

    alert("entered");
    desc = tinyMCE.get('desc').getContent();

    $http.post('http://localhost:9000/addPost', {
      title : $scope.title,
      link : $scope.link,
      post_date : $scope.post_date,
      type : $scope.type,
      desc : desc}, config)
      .then(
              function(response){
                alert("Success");
                $scope.title ='';
                $scope.link = '';
                $scope.post_date = '';
                $scope.type = '';
                tinyMCE.get('desc').setContent("");

              },
              function(response){
                alert("Failed");
              }
          );

    }
});
