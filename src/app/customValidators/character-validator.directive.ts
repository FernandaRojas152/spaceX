import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidCharacterValidator(): ValidatorFn {
    const character= 'l';
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value.toLowerCase().includes(character.toLowerCase())) {
            return {'CharacterInvalid': true};
        }
        return null;
    }
}