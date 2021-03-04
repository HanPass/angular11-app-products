import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataState, Product, DataStateEnum, ActionEvent, ProductActions } from 'src/app/model/product.model';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;

  @Output() productEventEmiiter : EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChange(p:Product){
    this.productEventEmiiter.emit({type:ProductActions.CHANGE_SELECT_PRODUCT,payload:p});
  }

  deleteProduct(id:number){
    this.productEventEmiiter.emit({type:ProductActions.DELETE_PRODUCT,payload:id});
  }

  editProduct(p:Product){
    this.productEventEmiiter.emit({type:ProductActions.EDIT_PRODUCT,payload:p});
  }

  callMyEvent($event:ActionEvent){
    this.productEventEmiiter.emit($event);
  }

}
