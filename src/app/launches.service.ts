import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { InfoSpaceX } from './info-space-x';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService implements OnInit {
  private infoURL = "https://api.spacexdata.com/v3/info";
  private launchesURL = "https://api.spacexdata.com/v3/launches/";

  constructor(private http: HttpClient) { };

  ngOnInit(): void {

  }

  /** application/json it's a good practice or needed here? */

  getInfo(): Observable<InfoSpaceX> {
    return this.http.get<InfoSpaceX>(this.infoURL).pipe(
      retry(3),
      catchError(this.handleError<InfoSpaceX>("GetInfo")),
    );
  }

  getLaunches() {
    return this.http.get(this.launchesURL).pipe(
      retry(3),
      catchError(this.handleError<any>("GetLaunches")),
    );
  }

  getLaunch(id: number){
    return this.http.get(`$(this.launchesURL)${id}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status == 0) {
        console.log("An error occurred:", error.message);
      } else {
        console.log(`Error status ${error.status}, and: `,error.error);
      }

      return of(result as T);
    }
  }
}
