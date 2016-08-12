var app = angular.module("postApp",[]);
app.controller("createPostController", function($scope, $http){

  var config = {
  headers : {
      'Content-Type': 'application/json'
      }
  }

  $scope.initTech = function () {
	$http.post('http://localhost:9000/techlistGet')
	.then(
              function(response){
		var data = response.data;
		var l = new Array();
		for ( i = 0 ; i < data.length ; i++)
			l.push(data[i].name);
		$scope.technologies = l;
              },
              function(response){
                //alert("Failed");
              }
          );
  };

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
app.controller("techPostController", function($scope, $http){

  var config = {
  headers : {
      'Content-Type': 'application/json'
      }
  }

  $scope.initTech = function () {
	$http.post('http://localhost:9000/techlistGet')
	.then(
              function(response){
		var data = response.data;
		var l = new Array();
		for ( i = 0 ; i < data.length ; i++)
			l.push(data[i].name);
		$scope.technologies = l;
		ele = angular.element(document.querySelector('#techlist_ul'));
		var newDirective = angular.element('<div id="addTechDiv"><input id="tech_text" class="w3-input w3-border w3-round" style="margin-bottom:5px;width:150px;float:left; margin-right:15px;" type="text" /> <button class="w3-btn w3-white w3-border w3-border-green w3-round-xlarge" onclick="addTechFunc();" style="margin-bottom:5px;float:left;">Button</button></div>');
		ele.append(newDirective);
              },
              function(response){
                //alert("Failed");
              }
          );
  };

  $scope.addTechFunc = function(techName){

    alert(techName);
    
    $http.post('http://localhost:9000/techlistAdd', {
      name : techName}, config)
      .then(
              function(response){
		console.log(response);
		if (response.data.indexOf('success') != -1)
		{
			document.querySelector('#addTechDiv').remove();
			$scope.initTech();
			scope = angular.element(document.getElementById('Demo3')).scope();
			scope.initTech();
			
		}		
		else		
		{
			alert('There seems to be error');
		}
              },
              function(response){
                alert("Failed");
              }
          );
    }
});
function addTechFunc()
{
	ele = document.querySelector('#tech_text');
	if (ele.value)
	{
		scope = angular.element(document.getElementById('Demo1')).scope();
		scope.addTechFunc(ele.value);
	}
	else
	{	
		alert('Tech name can not be blank');
	}
}
