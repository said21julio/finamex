import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly BASE_URL = 'https://fakestoreapi.com';
  readonly ALL_PRODUCTS = '/products';
  constructor(private http:HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + this.ALL_PRODUCTS);
  }
  
}
