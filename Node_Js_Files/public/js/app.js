        var app = angular.module("myTechInApp",[]);


        app.controller("myTechInController", function($scope, $http, $window){
            $scope.loginID ="";
            $scope.password ="";
            $scope.hideForm = false;
            $scope.registerFormInput = true;

            var config = {
            headers : {
                'Content-Type': 'application/json'
                }
            }

            $scope.registerForm = function(){
                $scope.hideForm = true;
                $scope.registerFormInput = false;
                $scope.fName ='';
                $scope.lName = '';
                $scope.email ='';
                $scope.password ='';
                $scope.confpassword ='';
            }

            $scope.registerDetails = function(){

                $http.post('http://localhost:9000/send', {
                        fName : $scope.fName,
                        lName : $scope.lName,
                        gender :$scope.gender,
                        loginId: $scope.email,
                        Password: $scope.password }, config)
                        .then(
                                function(response){
                                    alert("Inserted");
                                },
                                function(response){
                                    alert("failed to insert");
                                }
                            );
                $scope.hideForm = false;
                $scope.registerFormInput = true;
                $scope.loginID ='';
                $scope.password ='';
            }

            $scope.signIn = function(){

               $http.post('http://localhost:9000/login', {
                            loginId: $scope.loginID,
                            password: $scope.password }, config)
                            .then(function(response){
                               if(response.data === 'signedIn'){
                                 $window.location.href = 'http://localhost:9000/home';
                               } else if (response.data == 'admin'){
                                 $window.location.href = 'http://localhost:9000/getAdmin';
                               } else {

                                  alert("Failed");
                               }


                            }, function(response){
                                 alert("Failed again :(");
                            });
                          }

      });

      app.controller("cardsController", function($http, $scope){

        var config = {
        headers : {
            'Content-Type': 'application/json'
            }
        }

        $scope.getRecords = function(){

        $http.get('http://localhost:9000/techlistGet', config)
          .then(function(response){
            $scope.records = response.data;
          }, function(response){
              alert("Failed");
          });
    }
});
