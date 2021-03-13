import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { EventDriverService } from 'src/app/model/event.driver.service';
import { ProductActions } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted:boolean = false;

  constructor(private fb:FormBuilder, private productService:ProductsService, private router:Router, private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name:["", Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      selected:[false, Validators.required],
      available:[false, Validators.required]
    });
  }

  saveProduct(){
    this.submitted = true;
    if(this.productFormGroup.valid){
      this.productService.addProduct(this.productFormGroup.value).subscribe(data => {
        this.eventDriverService.publishEvent({type:ProductActions.PRODUCT_ADDED});
      });
    }
  }

  cancelPage(){
    this.router.navigateByUrl("/products");
  }

}
