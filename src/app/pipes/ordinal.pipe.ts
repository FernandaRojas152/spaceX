import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {
  private suffixes=["th", "st", "nd", "rd"];

  transform(value: number): string {
    const lastDigit= value+1%100;
    const ordinal= this.suffixes[(lastDigit-20)%10] || this.suffixes[lastDigit] || this.suffixes[0];
    return `${ordinal}`;
  }

}
