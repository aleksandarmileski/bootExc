import {AbstractControl} from "@angular/forms";

interface IValidation {
  [key: string]: boolean;
}

export class CustomValidators {

  static numberFormat(control: AbstractControl): IValidation {
    // let pattern:RegExp = /\S+@\S+\.\S+/;
    console.log("Value: " + control.value + " type number: " + isNaN(control.value));
    let pattern: RegExp = /^\d+$/;
    return pattern.test(control.value) ? null : {"numberFormat": true};
  }

  static duplicated(control: AbstractControl) {
    const q = new Promise<IValidation>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'john.doe@gmail.com') {
          resolve({'duplicated': true});
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return q;
  }
}
