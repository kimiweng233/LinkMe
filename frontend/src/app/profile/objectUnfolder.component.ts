import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appProperties'
})
export class PropertiesPipe implements PipeTransform {
  transform(value: {}): string[] {
    if (!value) {
      return [];
    }
    return Object.keys(value);
  }
}