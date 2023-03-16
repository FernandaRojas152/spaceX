import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-index-launch',
  templateUrl: './index-launch.component.html',
  styleUrls: ['./index-launch.component.scss']
})
export class IndexLaunchComponent {
  @Input() index: number;
}
