'use strict';

angular.module('contactApp', [
  'ngMessages'
]).
controller('contactCtrl', function ($window) {
   // variables
    var vm = this;
    var contactCollection = $window.localStorage.getItem('contacts') ? JSON.parse($window.localStorage.getItem('contacts')) : [];
    var isEditing = false;
    vm.person = setBlankPerson();
    vm.contacts = contactCollection.length > 0 ? contactCollection : '';
    vm.status = ['Active', 'Inactive'];

    //methods
    vm.addContact = function (contactForm) {
        if (contactForm.$valid) {
                if (isEditing !== false) {
                    contactCollection[isEditing] = vm.person;
                    isEditing = false;
                } else {
                    contactCollection.push(vm.person);
                }
                vm.contacts = contactCollection;
                $window.localStorage.setItem('contacts', JSON.stringify(contactCollection))
                vm.person = setBlankPerson();
                contactForm.$setUntouched();
            }
    };
    vm.editContact = function (editPerson) {
        isEditing = contactCollection.indexOf(editPerson);
        vm.person = angular.copy(editPerson);
    };
    vm.removeContact = function (removePerson) {
        var index = contactCollection.indexOf(removePerson);
        contactCollection.splice(index, 1);
        if (contactCollection.length === 0) {
            vm.person = setBlankPerson();
            vm.contacts = undefined;
            $window.localStorage.removeItem('contacts');
        } else {
            $window.localStorage.setItem('contacts', JSON.stringify(contactCollection));
        }
    };
    vm.reset = function (contactForm) {
        vm.person = setBlankPerson();
        isEditing = false;
        contactForm.$setUntouched();
    };
    function setBlankPerson() {
      return {firstname:'', lastname:'', email:'', mobile: '', status: ''};
    }
});
