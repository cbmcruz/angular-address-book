import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
})
export class FormatPhonePipe implements PipeTransform {
  transform(phone: string): string {
    return (
      '(' +
      phone.substring(0, 3) +
      ') ' +
      phone.substring(3, 6) +
      '-' +
      phone.substring(6, 10)
    );
  }
}
