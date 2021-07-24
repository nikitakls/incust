import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import products from '../../assets/data.json';

export interface Product {
  sku: number;
  name: string;
  type: string;
  price: number;
  upc: string;
  category: ProductCategory[];
  shipping: number;
  description: string;
  manufacturer: string;
  model: string;
  url: string;
  image: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public products: Product[] = Object.assign([], products);

  constructor() {
  }

  public getProducts(query: string = ''): Product[] {
    if(query && query.length > 0){
      const q = query.toLowerCase();
      return this.products.filter(p => p.name.toLowerCase().indexOf(q) !== -1 || p.description.toLowerCase().indexOf(q) !== -1);
    }
    return this.products;
  }

  public getProductById(id: number): Product {
    return this.products.find(p => p.sku === id);
  }
}
