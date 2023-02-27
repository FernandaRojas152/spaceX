import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable, of, switchMap } from "rxjs";
import { LaunchSpaceX } from "../launch-space-x";

export function NoDataRepeatedValidator(launches$: Observable<LaunchSpaceX>): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return launches$.pipe(
            map(launch=>{
                if(control.value === launch.mission_name){
                    return {'DuplicatedData': true};
                }
                return null;
            })
        )
    }
}