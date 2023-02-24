import { Component, OnInit } from '@angular/core';
import { LaunchesService } from '../launches.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launches$: Observable<LaunchSpaceX[]>;
  isFavoriteLaunch: boolean;

  constructor(private launchesService: LaunchesService) {}

  ngOnInit(): void {
    this.getLaunches();
  }

  getLaunches(): void {
    this.launches$ = this.launchesService.getLaunches().pipe(
      switchMap((launches) => {
        const favoriteLaunch = launches.find((launch) => this.launchesService.isFavorite(launch.flight_number));

        if (favoriteLaunch) {
          const updatedLaunches = [favoriteLaunch, ...launches.filter((launch) => launch !== favoriteLaunch)];
          return of(updatedLaunches);
        }

        return of(launches);
      }),
      tap((launches) => console.log("Favorite: ", launches))
    );
  }

  isFavorite(launch: LaunchSpaceX) {
    return this.launchesService.isFavorite(launch.flight_number);
  }

  addFavorite(launch: LaunchSpaceX) {
    console.log("This is the favorite", launch.flight_number);
    this.launchesService.addFavorite(launch.flight_number);
    this.getLaunches();
    this.isFavoriteLaunch= this.isFavorite(launch);
  }
}