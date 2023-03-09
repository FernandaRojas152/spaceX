import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches.service';
import { Observable, of, tap, } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoSpecialCharactersValidator } from '../customValidators/special-characters-validator.directive';
import { ValidCharacterValidator } from '../customValidators/character-validator.directive';
import { NoDataRepeatedValidator } from '../customValidators/repeated-name-validator.directive';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss']
})
export class LaunchDetailComponent implements OnInit {
  launch: LaunchSpaceX
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
      mission_name: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
      ],
      launch_year: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
      ],
      rocket: this.formBuilder.group({
        rocket_name: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
        ]
      }),
      launch_site: this.formBuilder.group({
        site_name: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
        ]
      }),
      details: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator()],
      ],
    });
  }


  getLaunch(): void {
    const id = this.launchesService.launch.flight_number;
    this.id = id;
    this.launchesService.getLaunch(id).pipe(
      tap(launch => console.log("First instance of the launch: ",this.launch = launch))
    ).subscribe(launch => this.launch = launch);
  }

  saveLaunch() {
    const updatedLaunch: LaunchSpaceX = { ...this.form.value, flight_number: this.id };
    console.log(updatedLaunch);
    const savedLaunch: LaunchSpaceX = { ...this.launchesService.launch, ...updatedLaunch };

    this.launchesService.updateLaunch(this.id, updatedLaunch);
    this.launch = savedLaunch;
    this.isEditing = false;
  }
}
