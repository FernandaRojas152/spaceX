import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFer]'
})
export class FerDirective implements OnInit {
  /**
  * Directive receives the index of the launches array
  * Prints the index and shows it in a component
  */
  @Input() index: number;
  @HostBinding('textContent') launchIndex: string;
  

  constructor() { }

  ngOnInit(): void {
    this.launchIndex= `${this.index+1}`;
  }

  ordinal(index: number){
  }
}
