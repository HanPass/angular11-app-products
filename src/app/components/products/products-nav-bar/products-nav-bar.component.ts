import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Product, AppDataState, DataStateEnum, ProductActions, ActionEvent } from 'src/app/model/product.model';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmiiter : EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  fetchAllProducts(){
    this.productEventEmiiter.emit({type:ProductActions.ALL_PRODUCTS});
  }
  fetchSelectedProducts(){
    this.productEventEmiiter.emit({type:ProductActions.SELECTED_PRODUCTS});
  }
  fetchAvailableProducts(){
    this.productEventEmiiter.emit({type:ProductActions.AVAILABLE_PRODUCTS});
  }

  addProduct(){
    this.productEventEmiiter.emit({type:ProductActions.ADD_PRODUCT});
  }

  onSearch(dataInForm:any){
    this.productEventEmiiter.emit({type:ProductActions.SEARCH_PRODUCT, payload:dataInForm});
  }

}
