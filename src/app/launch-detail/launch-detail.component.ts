import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches.service';
import { Observable, pipe, map } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss']
})
export class LaunchDetailComponent implements OnInit{
  launch$: Observable<LaunchSpaceX>;
  id: number;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private launchesService: LaunchesService, private location: Location) {
  }

  ngOnInit(): void {
    this.getLaunch();
  }

  getLaunch(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.id = id;
    this.launch$ = this.launchesService.getLaunch(id);
  }
}
