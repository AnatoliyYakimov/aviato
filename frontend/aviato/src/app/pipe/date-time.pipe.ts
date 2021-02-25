import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    return formatDate(value, 'yyyy-MM-dd hh:mm', 'ru', '+03:00');
  }

}
