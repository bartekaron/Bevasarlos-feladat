var app = angular.module('orarendApp', ['ngRoute', 'ngNotify']);

app.run(function($rootScope, $window){
    $rootScope.title = 'Órarend Applikáció';
    $rootScope.company = 'Bajai SZC Türr István Technikum';
    $rootScope.author = '12.A szoftverfejlesztő';
    
    $rootScope.aktDay = moment().day()-1;
    $rootScope.aktTime = moment(new Date()).format('H:mm');
    
    // a JWT tokenből kiolvassuk a fehasználó adatait (token payload)
    $rootScope.getLoggedUser = function(token){
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var loggedUser = JSON.parse($window.atob(base64));
        return loggedUser;
    }


    if (sessionStorage.getItem('OrarendApp')){
        $rootScope.isLoggedIn = true;
        token = JSON.parse(sessionStorage.getItem('OrarendApp')).token;
   //     console.log(token);
        $rootScope.loggedUser = $rootScope.getLoggedUser(token);
    }else{
        $rootScope.isLoggedIn = false;
        $rootScope.loggedUser = null;
    }

    $rootScope.days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
    $rootScope.hours = [
        {
            hour: 0,
            start: "7:15",
            end: "7:55"
        },
        {
            hour: 1,
            start: "8:00",
            end: "8:45"
        }, 
        {
            hour: 2,
            start: "8:55",
            end: "9:40"
        },
        {
            hour: 3,
            start: "9:50",
            end: "10:35"
        },
        {
            hour: 4,
            start: "10:50",
            end: "11:35"
        },
        {
            hour: 5,
            start: "11:45",
            end: "12:30"
        },
        {
            hour: 6,
            start: "12:40",
            end: "13:25"
        },
        {
            hour: 7,
            start: "13:30",
            end: "14:15"
        },
        {
            hour: 8,
            start: "14:45",
            end: "15:25"
        }
    ]

    $rootScope.serverUrl = 'http://sugomedia.ddns.net:2999';

   
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

