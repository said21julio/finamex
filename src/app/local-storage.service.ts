import { Injectable } from '@angular/core';
import { Product } from './product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  readonly key = 'allproducts';
  constructor() { }

  /**
   * @description - Set all items in storage
   * @param {Product} value - array of product of all items
   */
  public setAllItems(value: Product[]): void {
    localStorage.setItem(this.key, JSON. stringify(value));
  }
    
  /**
   * @description - Gets all items
   * @returns {Product} all products
   */
  public getAllItems(): Product[] {
    let localProducts: string | null = localStorage.getItem(this.key);
    return localProducts ? JSON.parse(localProducts) : [];
  }

  /**
   * @description Replace a product from all products
   * @param itemToChange product to be replaced
   */
  public setItem(itemToChange: Product): void {
    let itemsFromStorage = this.getAllItems();
    let index = itemsFromStorage.findIndex(({ id }) => id==itemToChange.id);
    itemsFromStorage[index] = itemToChange;
    this.setAllItems(itemsFromStorage);
  }

}
