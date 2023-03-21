import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFer]'
})
export class FerDirective implements OnInit {
  /**
  * Directive receives the index of the launches array
  * Prints the index and shows it in a component
  */
  @Input() index: number | string;
  @HostBinding('textContent') launchIndex: string;
  @HostBinding('style') style;
  

  constructor() { }

  ngOnInit(): void {
    this.launchIndex= `${this.index}`;
    this.getStyles();
  }

  getStyles(){
    this.style={
      'border-radius': '77% 23% 41% 59% / 26% 38% 62% 74%',
      'width': '64px',
      'height': '64px',
      'background-image': 'linear-gradient(354deg, #541b56 0%, rgba(76,19,87,1) 40%, #400e42 98%, rgba(33,5,53,1) 100%)',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'position': 'absolute',
      'right': '-20px',
      'top': '-8px',
    }
  }
}
