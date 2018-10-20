import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string = null, limit: number = 10, surfix: string = '...'): any {
    if (!value) {
      return null;
    }
    return (value.length > limit) ? value.substring(0, limit) + surfix : value;
  }

}
