import { Component, OnInit } from '@angular/core';
import { LaunchesService } from '../launches.service';
import { find, Observable, tap } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoSpecialCharactersValidator } from '../customValidators/special-characters-validator.directive';
import { ValidCharacterValidator } from '../customValidators/character-validator.directive';
import { NoDataRepeatedValidator } from '../customValidators/repeated-name-validator.directive';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss']
})
export class LaunchDetailComponent implements OnInit {
  launch: LaunchSpaceX;
  launch$: Observable<LaunchSpaceX>;
  id: number;
  form: FormGroup;
  isEditing: boolean;

  constructor(private launchesService: LaunchesService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getLaunch();
    this.notFound();

    this.form = this.formBuilder.group({
      mission_name: ['', [Validators.required, ValidCharacterValidator(), NoSpecialCharactersValidator(),
      NoDataRepeatedValidator(this.launch.mission_name)]],
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
    this.launch = this.launchesService.launch;
  }

  edit() {
    this.isEditing = true;
    this.router.navigate(['detail', +this.route.snapshot.params['id']], { queryParams: { mode: 'edit' } });
  }

  saveLaunch() {
    const savedLaunch: LaunchSpaceX = {
      ...this.launchesService.launch,
      ...this.form.value,
      flight_number: this.id
    };
    this.launchesService.updateLaunch(this.id, savedLaunch);
    this.launch = savedLaunch;
    this.isEditing = false;
  }

  notFound() {
    const id = +this.route.snapshot.params['id'];
    if (this.launchesService.launches.find(launch => launch.flight_number == id)) {
      this.router.navigate(['/not-found']);
    }
  }
}
