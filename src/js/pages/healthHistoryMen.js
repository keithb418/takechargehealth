define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let FormHandler = require('common/formHandler');
    let template = require('text!html/pages/healthHistoryMen.html');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);

    class HealthHistoryMen extends FormHandler {
        constructor ($window, $http, $location, validateForm, showMessage) {
            super({
                $window,
                $http,
                $location,
                validateForm,
                showMessage
            }, 'health-history-men-captcha');
        }
        
        submit(form = {}) {
            return super.submit(form,'http://localhost:8081/health-history-men', [
                {
                    name: 'firstName',
                    type: 'textStrict',
                    required: true
                },
                {
                    name: 'lastName',
                    type: 'textStrict',
                    required: true
                },
                {
                    name: 'email',
                    type: 'email',
                    required: true
                },
                {
                    name: 'emailFreq',
                    type: 'text'
                },
                {
                    name: 'homePhone',
                    type: 'phone'
                },
                {
                    name: 'workPhone',
                    type: 'phone'
                },
                {
                    name: 'cellPhone',
                    type: 'phone'
                },
                {
                    name: 'heightFeet',
                    type: 'number'
                },
                {
                    name: 'heightInches',
                    type: 'number'
                },
                {
                    name: 'birthplace',
                    type: 'textSpace'
                },
                {
                    name: 'currWeight',
                    type: 'number'
                },
                {
                    name: 'sixMonthWeight',
                    type: 'number'
                },
                {
                    name: 'yearWeight',
                    type: 'number'
                },
                {
                    name: 'numKids',
                    type: 'number'
                },
                {
                    name: 'numPets',
                    type: 'number'
                },
                {
                    name: 'occupation',
                    type: 'textSpace'
                },
                {
                    name: 'workHours',
                    type: 'number'
                },
                {
                    name: 'healthConcerns',
                    type: 'text'
                },
                {
                    name: 'otherConcerns',
                    type: 'text'
                },
                {
                    name: 'feelBest',
                    type: 'text'
                }, 
                {
                    name: 'illnesses',
                    type: 'text'
                },
                {
                    name: 'healthMother',
                    type: 'text'
                },
                {
                    name: 'healthFather',
                    type: 'text'
                },
                {
                    name: 'ancestry',
                    type: 'textSpace'
                },
                {
                    name: 'sleepHours',
                    type: 'number'
                },
                {
                    name: 'whyWake',
                    type: 'text'
                },
                {
                    name: 'pain',
                    type: 'text'
                },
                {
                    name: 'gas',
                    type: 'text'
                },
                {
                    name: 'allergies',
                    type: 'text'
                },
                {
                    name: 'meds',
                    type: 'text'
                },
                {
                    name: 'therapies',
                    type: 'text'
                },
                {
                    name: 'exercise',
                    type: 'text'
                },
                {
                    name: 'breakfast',
                    type: 'text'
                },
                {
                    name: 'lunch',
                    type: 'text'
                },
                {
                    name: 'dinner',
                    type: 'text'
                },
                {
                    name: 'snacks',
                    type: 'text'
                },
                {
                    name: 'liquids',
                    type: 'text'
                },
                {
                    name: 'homeCook',
                    type: 'number'
                },
                {
                    name: 'restFood',
                    type: 'text'
                },
                {
                    name: 'crave',
                    type: 'text'
                },
                {
                    name: 'improve',
                    type: 'text'
                },
                {
                    name: 'comments',
                    type: 'text'
                }
            ],
            {
                title: 'Health History Submitted',
                message: 'Thank you for filling out the Health History form!  I look forward to meeting with you!'
            });
        }
    }

    angular.module('healthHistoryMen', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/health-history-men', {
                template: template,
                controller: 'healthHistoryMenCtrl'
            });
        }])
        .service('healthHistoryMen', HealthHistoryMen)
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .controller('healthHistoryMenCtrl', ($scope, $timeout, healthHistoryMen) => {
            angular.extend($scope, {
                captchaId: healthHistoryMen.captchaId,
                datepickerOpen: false,
                dateOptions: {
                    minDate: new Date(1900, 1, 1),
                    maxDate: new Date(),
                    showWeeks: false
                },
                health: {},
                restrictTo: (maxlength, field) => {
                    let value = $scope.health[field];

                    $scope.health[field] = healthHistoryMen.restrictTo(maxlength, value);
                },
                submitted: false,
                submit: () => {
                    $scope.errors = healthHistoryMen.submit($scope.health);
                }
            });

            $timeout(() => {
                healthHistoryMen.showCaptcha();
            }, 0, false);
        });
});