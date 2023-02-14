import { Component, OnInit } from '@angular/core';
import { LaunchesService } from '../launches.service';
import { Observable } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit{
  launches$: Observable<any>= new Observable;

  constructor(private launchesService: LaunchesService) {
  }

  ngOnInit(): void {
    this.getLaunches();
  }


  getLaunches(){
    this.launches$= this.launchesService.getLaunches();
  }
} 
