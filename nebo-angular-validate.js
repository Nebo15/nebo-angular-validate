'use strict';

angular.module('nebo-angular-validate', []).provider('$validate', function () {

  var validators = {};

  return {
    add: function (name, fn) {
      validators[name] = fn;
    },
    $get: function () {

      var obj = {};
      obj.validator = function (type) {
        if (!validators[type]) throw new Error('validator not found');
        return validators[type];
      };

      return obj;
    }
  }

}).directive('validate', function ($validate) {

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, el, attrs, ngModel) {

      if (!ngModel) return;
      var type;

      attrs.$observe('validate', function (val) {
        init(val);
      });

      init(attrs['validate']);
      function init (newType) {

        if (type) {
          delete ngModel.$validators[type];
        }
        var validatorFn = $validate.validator(newType);

        if (validatorFn) {
          type = newType;
          ngModel.$validators[newType] = function (modelValue, viewValue) {
            return ngModel.$isEmpty(viewValue) || (
              typeof validatorFn == 'function' ? validatorFn(modelValue) :
              validatorFn instanceof RegExp    ? validatorFn.test((modelValue || '').toString()) :
              false
            )
          }
        }
      }
    }
  }
});
