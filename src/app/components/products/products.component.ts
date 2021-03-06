import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, AppDataState, DataStateEnum, ProductActions, ActionEvent } from 'src/app/model/product.model';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { EventDriverService } from 'src/app/model/event.driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService, private router:Router, private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent) => {
      this.callMyEvent(actionEvent)
    });
  }

  fetchAllProducts(){
    this.products$=this.productsService.getAllProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  fetchSelectedProducts(){
    this.products$=this.productsService.getSelectedProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  fetchAvailableProducts(){
    this.products$=this.productsService.getAvailableProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataInForm:any){
    this.products$=this.productsService.searchForProducts(dataInForm.keyword).pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelectChange(p:Product){
    this.productsService.changeSelectProducts(p).subscribe(data => {
      p.selected = data.selected;
    });

  }

  deleteProduct(id:number){
    if(confirm("Are you sure to delete")) {
      this.productsService.deleteProduct(id).subscribe(
        data => {
          this.fetchAllProducts();
        }
      );
    }
  }

  addProduct(){
    this.router.navigateByUrl("/addProduct");
  }

  editProduct(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  callMyEvent($event:ActionEvent){
    switch($event.type){
      case ProductActions.ALL_PRODUCTS: this.fetchAllProducts();break;
      case ProductActions.SELECTED_PRODUCTS: this.fetchSelectedProducts();break;
      case ProductActions.AVAILABLE_PRODUCTS: this.fetchAvailableProducts();break;
      case ProductActions.SEARCH_PRODUCT: this.onSearch($event.payload);break;
      case ProductActions.ADD_PRODUCT: this.addProduct();break;
      case ProductActions.EDIT_PRODUCT: this.editProduct($event.payload);break;
      case ProductActions.DELETE_PRODUCT: this.deleteProduct($event.payload);break;
      case ProductActions.CHANGE_SELECT_PRODUCT: this.onSelectChange($event.payload);break;
      default:
    }
  }

}
