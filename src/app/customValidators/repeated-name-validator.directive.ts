import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function NoDataRepeatedValidator(data: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return data== control.value ? {'DataRepeated': true} : null;
    }
}