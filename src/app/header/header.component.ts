import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoSpaceX } from '../info-space-x';
import { LaunchesService } from '../launches.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  info$: Observable<InfoSpaceX>;

  constructor(private launchesService: LaunchesService){
    
  }
  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.info$= this.launchesService.getInfo();
  }

}
