import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted:boolean = false;

  constructor(private fb:FormBuilder, private productService:ProductsService, private router:Router) { }

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
        alert("New product added successfully");
        this.router.navigateByUrl("/products");
      });
    }
  }

  cancelPage(){
    this.router.navigateByUrl("/products");
  }

}
