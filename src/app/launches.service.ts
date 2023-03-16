import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { InfoSpaceX } from './info-space-x';
import { LaunchSpaceX } from './launch-space-x';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService implements OnInit {
  private infoURL = "https://api.spacexdata.com/v3/info";
  private launchesURL = "https://api.spacexdata.com/v3/launches/";
  private favorite: number;
  public launches: LaunchSpaceX[] = [];
  public launch: LaunchSpaceX;

  constructor(private http: HttpClient) {

  };

  ngOnInit(): void {
  }

  addFavorite(id: number) {
    this.favorite = id;
  }

  isFavorite(id: number) {
    return this.favorite === id;
  }

  getInfo(): Observable<InfoSpaceX> {
    return this.http.get<InfoSpaceX>(this.infoURL).pipe(
      retry(3),
      catchError(this.handleError<InfoSpaceX>("GetInfo")),
    );
  }

  getLaunches(): Observable<LaunchSpaceX[]> {
    return this.http.get<LaunchSpaceX[]>(this.launchesURL);
  }

  getLaunch(id: number): Observable<LaunchSpaceX> {
    return this.http.get<LaunchSpaceX>(`https://api.spacexdata.com/v3/launches/${id}`).pipe(tap(launch=> this.launch= launch));
  }

  updateLaunch(id: number, updatedLaunch: LaunchSpaceX) {
    const index = this.launches.findIndex(launch => launch.flight_number === id);
    this.launches[index]= updatedLaunch;
    console.log('Updated launch:', this.launches[index]);
    return this.launches[index];
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status == 0) {
        console.log("An error occurred:", error.message);
      } else {
        console.log(`Error status ${error.status}, and: `, error.error);
      }
      return of(result as T);
    }
  }
}
