import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['./subtotal.component.css']
})
export class SubtotalComponent implements OnInit {

  @Input('subtotal')subtotal: number;
  @ViewChild('termsConditions') terms: ElementRef;
  constructor() {
    this.subtotal = 0;
    this.terms = new ElementRef('subtotal');
  }

  ngOnInit(): void {
  }

  /**
   * @description show terminos y condiciones
   */
  public checkout(): void {
    Swal.fire(undefined,this.terms.nativeElement.innerHTML);
  }
}
