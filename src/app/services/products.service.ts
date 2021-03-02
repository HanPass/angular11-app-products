import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({providedIn:"root"})
export class ProductsService {
    constructor(private http:HttpClient){
    }

    getAllProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products");
    }

    getProductById(id:number):Observable<Product>{
      let host = environment.host;
      return this.http.get<Product>(host+"/products/"+id);
    }

    getSelectedProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?selected=true");
    }

    getAvailableProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?available=true");
    }

    searchForProducts(value:string):Observable<Product[]>{
        console.log("hani f service search: " + value);
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?name_like="+value);
    }

    changeSelectProducts(p:Product):Observable<Product>{
        p.selected = !p.selected;
        let host = environment.host;
        return this.http.put<Product>(host+"/products/"+p.id,p);
    }

    deleteProduct(id:number):Observable<Product>{
        let host = environment.host;
        return this.http.delete<Product>(host+"/products/"+id);
    }

    addProduct(p:Product):Observable<Product>{
      let host = environment.host;
      return this.http.post<Product>(host+"/products",p)
    }

    editProduct(p:Product):Observable<Product>{
      let host = environment.host;
      return this.http.put<Product>(host+"/products/"+p.id,p)
    }
}
