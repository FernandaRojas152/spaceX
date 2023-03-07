import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches.service';
import { Observable, pipe, map, tap, of, switchMap } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoSpecialCharactersValidator } from '../customValidators/special-characters-validator.directive';
import { ValidCharacterValidator } from '../customValidators/character-validator.directive';
import { NoDataRepeatedValidator } from '../customValidators/repeated-name-validator.directive';
import { InfoSpaceX } from '../info-space-x';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss']
})
export class LaunchDetailComponent implements OnInit {
  launch$: Observable<LaunchSpaceX>;
  id: number;
  form: FormGroup;
  isEditing: boolean;

  constructor(private route: ActivatedRoute,
    private launchesService: LaunchesService,
    private location: Location,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLaunch();
    this.saveLaunch();
    
    this.form = this.formBuilder.group({
      mission_name: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
        [NoDataRepeatedValidator(this.launch$),]],
      launch_year: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
        [NoDataRepeatedValidator(this.launch$),]],
      rocket_name: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
        [NoDataRepeatedValidator(this.launch$),]],
      site_name: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
        [NoDataRepeatedValidator(this.launch$),]],
      details: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
        [NoDataRepeatedValidator(this.launch$),]],
    });
  }

  getLaunch(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.id = id;
    this.launch$ = this.launchesService.getLaunch(id);
  }

  saveLaunch() {
    const updated = { flight_number: 1, mission_name: 'Launch test',
    launch_year: '2006', rocket:{rocket_name: 'test'}, details: 'It crashed',
    launch_site:{site_name:'Canada'} };
    this.launchesService.updateLaunch(updated);
    /* this.launch$ = this.launchesService.getLaunches().pipe(
      switchMap((launches) => {
        const index = launches.findIndex(launch => launch.flight_number === this.id);
        if (index !== -1) {
          const updatedLaunch = { ...launches[index], ...this.form.value };
          return this.launchesService.updateLaunch(updatedLaunch).pipe(
            map((updated) => {
              return updated;
            })
          );
        }
        return this.launch$;
      })
    );
    this.isEditing = false; */
  }
}
