import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches.service';
import { Observable, pipe, map, tap } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoSpecialCharactersValidator } from '../customValidators/special-characters-validator.directive';
import { ValidCharacterValidator } from '../customValidators/character-validator.directive';
import { NoDataRepeatedValidator } from '../customValidators/repeated-name-validator.directive';

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

    this.form = this.formBuilder.group({
      mission_name: ['', [Validators.required,
      ValidCharacterValidator(),
      NoSpecialCharactersValidator()],
      [
        NoDataRepeatedValidator(this.launch$),
      ]],
      launch_year: [''],
      rocket_name: [''],
      site_name: [''],
      details: [''],
    });
  }

  getLaunch(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.id = id;
    this.launch$ = this.launchesService.getLaunch(id);
  }

  saveLaunch() {
    this.isEditing = false;

  }
}
