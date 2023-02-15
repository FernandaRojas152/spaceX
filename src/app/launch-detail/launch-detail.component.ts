import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches.service';
import { Observable, Subject, pipe, tap, map } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss']
})
export class LaunchDetailComponent implements OnInit {
  launch$: Observable<any> | undefined;
  id: number;

  constructor(private route: ActivatedRoute, private launchesService: LaunchesService, private location: Location) {
  }

  ngOnInit(): void {
    this.getLaunch();

  }

  getLaunch(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.id= id;
    this.launch$ = this.launchesService.getLaunch(id).pipe(
      /*       map(launch=> {
              launch.isFavorite= false;
              return launch;
            }), */
    );
  }

  /*  favoriteLaunch$: Observable<any> | undefined; */

  addFavorite() {
    this.launchesService.addFavorite(this.id);
    /*     this.favoriteLaunch$= this.favoriteLaunchSubject$.pipe(
    
    
        ) */

  }

/*   toggleFavorite(launch: LaunchSpaceX) {
    this.favoriteLaunchSubject$.next(launch);
  } */
}
