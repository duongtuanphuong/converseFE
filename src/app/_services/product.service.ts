import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

const PRODUCT_API = "http://localhost:8080/admin/api/product/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct():Observable<any>{
    return this.http.get(PRODUCT_API,httpOptions);
  }

  getProductById(id :number):Observable<any>{
    return this.http.get(PRODUCT_API + id,httpOptions);
  }

  createProduct(product: Product,file : File):Observable<any>{
    let formData = new FormData();
    formData.append(
      'product',
      new Blob( [JSON.stringify(product)], {type : 'application/json'})
    );
    formData.append('file',file);
    return this.http.post(PRODUCT_API + 'create',formData);
  }

}
