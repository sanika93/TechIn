        var app = angular.module("myTechInApp",[]);
        app.controller("myTechInController", function($scope, $http){
            $scope.loginID ="";
            $scope.password ="";
            $scope.hideForm = false;
            $scope.registerFormInput = true;
            
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
                var config = {
                headers : {
                    'Content-Type': 'application/json'
                    }
                }   
                
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
                
                var config = {
                headers : {
                    'Content-Type': 'application/json'
                    }
                }   
                
                $http.post('http://localhost:9000/login', {
                    loginId: $scope.loginID,
                    password: $scope.password }, config)
                    .then(
                            function(response){
                                alert("Signed in");
                            },
                            function(response){
                                alert("Incorrect user details.");
                            }
                        );
              }
        });
 
