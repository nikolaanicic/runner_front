import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validatePassword() {
  const regex = /^(?=.*\d)[a-zA-Z\d]{5,13}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const passed = regex.test(control.value);
    return !passed ? { password: { value: control.value } } : null;
  };
}

export function validateRole() {
  let roles = ['Consumer', 'Deliverer'];

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = roles.indexOf(control.value) != -1;
    return !isValid ? { role: { value: control.value } } : null;
  };
}

export function validateDate() {
  const currentDate = new Date();
  return (control: AbstractControl): ValidationErrors | null => {
    function isLeapYear(year: number): boolean {
      return year % 400 === 0 || (year % 4 === 0 && year % 100 === 0);
    }

    let date: Date = control.value;
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    if (
      date >= currentDate ||
      month < 1 ||
      month > 12 ||
      (!isLeapYear(year) && month == 2 && day > 28) ||
      (isLeapYear(year) && month == 2 && day > 29) ||
      ((month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12) &&
        day > 31) ||
      ((month === 2 ||
        month === 4 ||
        month === 6 ||
        month === 9 ||
        month === 11) &&
        day > 30) ||
      day < 0
    ) {
      return { date: { value: date } };
    }
    return null;
  };
}

export function validatePrice() {
  return (control: AbstractControl): ValidationErrors | null => {
    let numValue = +control.value;
    if (isNaN(numValue) || numValue < 0 || numValue >= 10000)
      return { price: { value: control.value } };

    return null;
  };
}
