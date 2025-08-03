import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[], searchValue: string): IProduct[] {
    return products.filter(product => product.title.toLowerCase().includes(searchValue));
  }
}
