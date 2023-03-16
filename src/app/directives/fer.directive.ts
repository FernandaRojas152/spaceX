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
  private suffixes=["th", "st", "nd", "rd"];

  constructor() { }

  ngOnInit(): void {
    this.launchIndex= `${this.ordinal(this.index+1)}`;
  }

  ordinal(index: number){
    const lastDigit= index%100;
    return index + (this.suffixes[(lastDigit-20)%10] || this.suffixes[lastDigit] || this.suffixes[0]);
  }
}
