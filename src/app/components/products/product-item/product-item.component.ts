import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataState, Product, DataStateEnum, ActionEvent, ProductActions } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/model/event.driver.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() products$:Product|null=null;
  readonly DataStateEnum=DataStateEnum;

  @Output() productEventEmiiter : EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }

  onSelectChange(p:Product){
    // this.productEventEmiiter.emit({type:ProductActions.CHANGE_SELECT_PRODUCT,payload:p});
    this.eventDriverService.publishEvent({type:ProductActions.CHANGE_SELECT_PRODUCT,payload:p});
  }

  deleteProduct(id:number){
    // this.productEventEmiiter.emit({type:ProductActions.DELETE_PRODUCT,payload:id});
    this.eventDriverService.publishEvent({type:ProductActions.DELETE_PRODUCT,payload:id});
  }

  editProduct(p:Product){
    // this.productEventEmiiter.emit({type:ProductActions.EDIT_PRODUCT,payload:p});
    this.eventDriverService.publishEvent({type:ProductActions.EDIT_PRODUCT,payload:p});
  }

}
