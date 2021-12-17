import { Component, ElementRef, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public currentItems: Product[];
  public allItems: Product[];
  public subtotal: number;
  public currentToShowItem: Product;
  constructor(private productService: ProductService,
    private localStorageService: LocalStorageService) {
    this.currentItems = [];
    this.allItems = [];
    this.subtotal = 0;
    this.currentToShowItem = {
      category: '',
      description: '',
      id: 0,
      image: '',
      price: 0,
      quantity: 0,
      rating: {
        count: 0,
        rate: 0
      },
      title: ''
    };
  }

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * @description Get all products, it is used only on init
   */
  public getProducts(): void {
    this.productService.getProducts().subscribe((items: Product[]) => {
      console.log(items);
      let totalNumberItems = items.length;
      for (let i = 0; i < totalNumberItems; i++) {
        items[i].quantity = 0;
      }
      this.currentItems = items;
      this.allItems = items;
      this.localStorageService.setAllItems(items);
    }, (error) => {
      console.log(error);
    });

  }

  /**
   * @description - Updates an item from storage
   * @param {Product} item - item
   * @param {string} event - event produced on change input
   */
  public updateItem(item: Product, event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    if(value != '') {
      item.quantity = Number(value);
      this.localStorageService.setItem(item);
    }
    this.calculateSubtotal();
  }
 
  /**
   * @description - Filter items by title
   * @param event evet to search
   */
  public searchItem(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    let responseItems: Product[] = [];
    if(value == '') {
      this.clearSearch();
      return;
    }
    this.allItems.forEach((item: Product) => {
      if ( item.title.toUpperCase().match(value.toUpperCase())) {
        responseItems.push(item);
      }
    });
    this.currentItems = responseItems;
  }

  /**
   * @description Reset items
   */
  public clearSearch(): void {
    this.currentItems = this.allItems;
  }

  /**
   * @description open model to show item detail
   * @param item
   */
  public showDetailItem(item: Product): void {
    this.productService.getOneProduct(item.id).subscribe((item: Product) => {
      this.currentToShowItem = item;
      let htmlCode = '<div style="text-align:left">';
      htmlCode += '<div class="column is-one-third product-image">';
      htmlCode += '<img src="' + item.image + '">';
      htmlCode += '</div>';
      htmlCode += '<div class="column product-title">';
      htmlCode += '<h1>' + item.title + '</h1>';
      htmlCode += '<p><b>Available: </b>' + item.rating.count + '</p>';
      htmlCode += '<h3><b>Rate:</b> ' + item.rating.rate + '</h3>';
      htmlCode += '<h3><b>Categoria:</b> ' + item.category + '</h3>';
      htmlCode += '<h3>' + item.description + '</h3>';
      htmlCode += '</div>';
      htmlCode += '<div class="column">';
      htmlCode += '<span> <b>Precio</b></span> $' + item.price;
      htmlCode += '</div>';
      htmlCode += '</div>';
      Swal.fire('', htmlCode);
      
    }, () => {
      Swal.fire('Ocurrió un error al traer el producto', undefined, 'error');
    });
    
  }

  /**
   * @description - It calculates subtotal
   */
  private calculateSubtotal(): void {
    let total = 0;
    this.allItems.forEach((item: Product) => {
      total += item.quantity*item.price;
    });
    this.subtotal = Number(total.toFixed(2));
  }
}
