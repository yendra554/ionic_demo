import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'network',
  standalone: true
})
export class NetworkPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
