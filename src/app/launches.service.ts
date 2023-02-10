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
  private launchesURL = "https://api.spacexdata.com/v3/launches";

  constructor(private http: HttpClient) { };

  ngOnInit(): void {

  }

  getInfo(): Observable<InfoSpaceX> {
    return this.http.get<InfoSpaceX>(this.infoURL).pipe(
      catchError(this.handleError<InfoSpaceX>("GetInfo")),
    );
  }

  getLaunches() {
    //change to type observable later.
    this.http.get(this.launchesURL);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status == 0) {
        console.log(error.message);
      } else {
        console.log(error.error);
      }

      return of(result as T);
    }
  }
}
