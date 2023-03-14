import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable, of, switchMap } from "rxjs";
import { LaunchSpaceX } from "../launch-space-x";

export function NoDataRepeatedValidator(data: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return data== control.value ? {'DataRepeated': true} : null;
    }
}