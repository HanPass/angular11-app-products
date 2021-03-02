import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, AppDataState, DataStateEnum } from 'src/app/model/product.model';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
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

  // fetchAllProducts(){
  //   console.log("wsselt fetchAllProducts");
  //   this.productsService.getAllProducts().subscribe(data => {
  //     this.products = data;
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }

  // fetchSelectedProducts(){
  //   console.log("wsselt fetchSelectedProducts");
  //   this.productsService.getSelectedProducts().subscribe(data => {
  //     this.products = data;
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }

  // fetchAvailableProducts(){
  //   console.log("wsselt fetchAvailableProducts");
  //   this.productsService.getAvailableProducts().subscribe(data => {
  //     this.products = data;
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }

}
