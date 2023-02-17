import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches.service';
import { Observable, pipe, map } from 'rxjs';
import { LaunchSpaceX } from '../launch-space-x';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss']
})
export class LaunchDetailComponent implements OnInit, AfterContentChecked {

  launch$: Observable<LaunchSpaceX>;
  id: number;
  favorite: string="Add to Favorites";

  constructor(private route: ActivatedRoute, private launchesService: LaunchesService, private location: Location) {
  }

  ngOnInit(): void {
    this.getLaunch();
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    
  }

  getLaunch(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.id = id;
    this.launch$ = this.launchesService.getLaunch(id);
  }

  addFavorite() {
    this.favorite="Added to favorites";
    this.launchesService.addFavorite(this.id);
  }
}
