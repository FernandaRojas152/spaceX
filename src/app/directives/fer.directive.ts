import { Directive } from '@angular/core';

@Directive({
  selector: '[appFer]'
})
export class FerDirective {
  /**
   * Directive receives the index of the launches array
   * Prints the index and shows it in a component
   */

  constructor() { }

}
