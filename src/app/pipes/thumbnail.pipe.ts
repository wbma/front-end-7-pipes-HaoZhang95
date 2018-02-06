import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const defaultSize = '-tn320.png';
    const sizes = {
      small: '-tn160.png',
      medium: '-tn320.png',
      large: '-tn640.png',
    };

    return (args ?
      ( (args in sizes) ? value.split('.')[0] + sizes[args] : value.split('.')[0] + defaultSize )
      : value.split('.')[0] + defaultSize);
  }

}

