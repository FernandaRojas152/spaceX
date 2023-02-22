import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { InfoSpaceX } from './info-space-x';
import { LaunchSpaceX } from './launch-space-x';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService implements OnInit {
  private infoURL = "https://api.spacexdata.com/v3/info";
  private launchesURL = "https://api.spacexdata.com/v3/launches/";
  private favorite: number;

  constructor(private http: HttpClient) { };

  ngOnInit(): void {
  }

  addFavorite(id: number){
    this.favorite= id;
  }

  isFavorite(id: number){
    return this.favorite=== id;
  }

  getInfo(): Observable<InfoSpaceX> {
    return this.http.get<InfoSpaceX>(this.infoURL).pipe(
      retry(3),
      catchError(this.handleError<InfoSpaceX>("GetInfo")),
    );
  }

  getLaunches() {
    return this.http.get<LaunchSpaceX[]>(this.launchesURL).pipe(
      retry(3),
      catchError(this.handleError<any>("GetLaunches")),
    );
  }


  getLaunch(id: number){
    return this.http.get<LaunchSpaceX>(`https://api.spacexdata.com/v3/launches/${id}`).pipe(
      retry(3),
      catchError(this.handleError<any>("getLaunch")),
    );
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
