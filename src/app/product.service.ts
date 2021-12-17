import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly BASE_URL = 'https://fakestoreapi.com';
  readonly ALL_PRODUCTS_URL = '/products';
  readonly GET_ONE_URL = '/products';
  constructor(private http:HttpClient) { }

  /**
   * @description Get all products from server
   * @returns all products
   */
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL + this.ALL_PRODUCTS_URL);
  }

  /**
   * @description Gets detail information
   * @param itemId - Item identifier
   * @returns  Returns one product by id
   */
  public getOneProduct(itemId: number): Observable<Product> {
    return this.http.get<Product>(this.BASE_URL + this.GET_ONE_URL + '/' + itemId);
  }
  
}
