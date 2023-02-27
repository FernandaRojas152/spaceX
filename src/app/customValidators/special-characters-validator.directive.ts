import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function NoSpecialCharactersValidator(): ValidatorFn {
    const specialChar= /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return (control: AbstractControl): ValidationErrors | null => {
        if(specialChar.test(control.value)) {
            return {'SpecialCharactersInvalid': true};
        }
        return null;
    }
}