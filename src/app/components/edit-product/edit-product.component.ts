import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productFormGroup?:FormGroup;
  productId:number;
  submitted:boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private productService:ProductsService, private fb:FormBuilder, private router:Router) {
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe(data => {
      this.productFormGroup = this.fb.group({
        name:[data.name, Validators.required],
        price:[data.price, Validators.required],
        quantity:[data.quantity, Validators.required],
        selected:[data.selected, Validators.required],
        available:[data.available, Validators.required]
      });
    })
  }

  editProduct(){
    this.submitted = true;
    if(confirm("Are you sure to edit")) {
      this.productFormGroup.value.id = this.productId;
      this.productService.editProduct(this.productFormGroup.value).subscribe(data => {
        alert("Product edited successfully!");
        this.router.navigateByUrl("/products");
      });
    }
  }


}
