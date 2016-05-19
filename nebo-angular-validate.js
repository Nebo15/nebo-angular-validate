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
        if (!validators[type]) {
          console.error('validator '+type+' not found');
          return null;
        }
        return validators[type];
      };
      obj.validate = function (type, value) {
        var validateObject = obj.validator(type);

        if (typeof validateObject == 'function') {
          return validateObject(value);
        }
        if (validateObject instanceof RegExp) {
          return validateObject.test((value || '').toString());
        }
        console.error('Unsupported type of validator object', validateObject);

        return false;
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
        var validateObj = $validate.validator(newType);
        if (validateObj) {
          type = newType;
          ngModel.$validators[newType] = function (modelValue, viewValue) {
            return ngModel.$isEmpty(viewValue) || $validate.validate(newType, modelValue);

          }
        }
      }
    }
  }
});
