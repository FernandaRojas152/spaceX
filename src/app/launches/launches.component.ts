import { Component, OnInit } from '@angular/core';
import { LaunchesService } from '../launches.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';
import { Router } from '@angular/router';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launches$: Observable<LaunchSpaceX[]>;
  launchesArray: LaunchSpaceX[];
  isFavoriteLaunch: boolean;

  constructor(private launchesService: LaunchesService, private router: Router) { }

  ngOnInit(): void {
    this.getLaunchesArray();
  }

  getLaunches(): void {
    /* this.launches$ = this.launchesService.getLaunches().pipe(
      switchMap((launches) => {
        const favoriteLaunch = launches.find((launch) => this.launchesService.isFavorite(launch.flight_number));

        if (favoriteLaunch) {
          const updatedLaunches = [favoriteLaunch, ...launches.filter((launch) => launch !== favoriteLaunch)];
          return of(updatedLaunches);
        }
        return of(launches);
      })
    ); */
  }

  getLaunchesArray(): void {
    this.launchesService.getLaunches().pipe(map(launches => {
      const favoriteLaunch = launches.find(launch => this.launchesService.isFavorite(launch.flight_number));
      if (favoriteLaunch) {
        const updatedLaunches = [favoriteLaunch, ...launches.filter(launch => launch !== favoriteLaunch)];
        console.log(updatedLaunches);
        return updatedLaunches;
      }
      return launches;
    })).subscribe(launches => this.launchesArray = launches);
  }

  goToLaunch(launch: LaunchSpaceX) {
    this.launchesService.launch = launch;
    this.router.navigate(['detail', launch.flight_number]);
  }

  isFavorite(launch: LaunchSpaceX) {
    return this.launchesService.isFavorite(launch.flight_number);
  }

  addFavorite(launch: LaunchSpaceX) {
    this.launchesService.addFavorite(launch.flight_number);
    this.getLaunchesArray();
    this.isFavoriteLaunch = this.isFavorite(launch);
  }

  trackByFlightNumber(index: number, launches: any) {
    return launches.flight_number;
  }
}