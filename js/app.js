var app = angular.module('bevasarlo', ['ngRoute', 'ngNotify']);
let kategoria = document.querySelector("#kategoria");


app.run(function($rootScope){

    $rootScope.termekitems = [];
    


    axios.get('http://localhost:3000/mock_data').then(res => {
        $rootScope.termekitems = res.data;
        $rootScope.$apply();
    }); 

    
    
    
});

app.config(function($routeProvider){

    $routeProvider
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'userCtrl'
    })
    .when('/reg', {
        templateUrl: 'views/registration.html',
        controller: 'userCtrl'
    })
    .when('/timetable', {
        templateUrl: 'views/timetable.html',
        controller: 'timetableCtrl'
    })
    .otherwise(
        {redirectTo: '/login'}
    )
});

