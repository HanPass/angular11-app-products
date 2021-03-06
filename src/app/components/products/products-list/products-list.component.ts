import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataState, Product, DataStateEnum, ActionEvent, ProductActions } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/model/event.driver.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;

  // @Output() productEventEmiiter : EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private eventDriverEvent:EventDriverService) { }

  ngOnInit(): void {
  }

  // onSelectChange(p:Product){
  //   // this.productEventEmiiter.emit({type:ProductActions.CHANGE_SELECT_PRODUCT,payload:p});
  //   this.eventDriverEvent.publishEvent({type:ProductActions.CHANGE_SELECT_PRODUCT,payload:p});
  // }

  // deleteProduct(id:number){
  //   // this.productEventEmiiter.emit({type:ProductActions.DELETE_PRODUCT,payload:id});
  //   this.eventDriverEvent.publishEvent({type:ProductActions.DELETE_PRODUCT,payload:id});
  // }

  // editProduct(p:Product){
  //   // this.productEventEmiiter.emit({type:ProductActions.EDIT_PRODUCT,payload:p});
  //   this.eventDriverEvent.publishEvent({type:ProductActions.EDIT_PRODUCT,payload:p});
  // }

  // callMyEvent($event:ActionEvent){
  //   // this.productEventEmiiter.emit($event);
  //   this.eventDriverEvent.publishEvent($event);
  // }

}
