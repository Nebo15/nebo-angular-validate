# Nebo Angular Validate

Angular JS validation module. It provides simple interface for custom validations setup.

## Installation

```
bower install nebo-angular-validate --save
```

```
angular.module('app', [
  'nebo-angular-validate'
]);

## Usage

### Configuration 

```
angular.module('app').config(function ($validateProvider) {

  function validateName(val) {
    val = (val || '').toString();
    return /^[A-Za-zĂăÂâÎîȘșȚț\- ]{2,}$/.test(val);
  }

  function validatePhoneNumber(val) {
    val = (val || '').toString();
    return /^(\+373|0)[0-9]{9}$/.test(val);
  }

  function validateBuilding(val) {
    val = (val || '').toString();
    return /^[0-9]+([A-Za-z]{1})?((\/|-)+[0-9]+([A-Za-z]{1})?)?$/.test(val);
  }

  var emailRegexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  function validateEmail (val) {
    return emailRegexp.test(val || '');
  }

  function validateFamilyStatus (val) {
    return ['Not Married','Married','Divorced','Civil','Employed','Unemployed'].indexOf(val) > -1;
  }

  $validateProvider.add('idnp', validateIdnp);
  $validateProvider.add('iban', validateIBAN);

  $validateProvider.add('firstname', validateName);
  $validateProvider.add('lastname', validateName);
  $validateProvider.add('patronymic', validateName);

  $validateProvider.add('phoneNumber', validatePhoneNumber);

  $validateProvider.add('building', validateBuilding);

  $validateProvider.add('familyStatus', validateFamilyStatus);
 
  $validateProvider.add('email', validateEmail);

});
```


### UI

```
<input placeholder="First Name placeholder" name="firstName" title="firstName input title" validate="firstname" ng-model="model.firstName" required="required" class="input"/>

```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

*19.05.16* initial publication 

## Credits

Author: Alexey Bondarenko (alexeybondarenko@me.com)

## License

MIT
