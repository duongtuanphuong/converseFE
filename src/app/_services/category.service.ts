import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

const CATEGORY_API = "http://localhost:8080/admin/api/category/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  getAllCategory(): Observable<any> {
    return this.http.get(CATEGORY_API, httpOptions);
  }

  getCategoryEnabled():Observable<any>{
    return this.http.get(CATEGORY_API + 'enabled', httpOptions); 
  }

  getCategoryById( id :number): Observable<any>{
    return this.http.get(CATEGORY_API + id,httpOptions)
  }

  createCategory(category: Category):Observable<any>{
    return this.http.post(CATEGORY_API + 'create',category,httpOptions);
  }

  updateCategory(id:number,category:Category):Observable<any>{
    return this.http.put(CATEGORY_API + 'update/'+id,category,httpOptions );
  }

  enableCategory(id:number):Observable<any>{
    return this.http.post(CATEGORY_API + 'enable/' + id,httpOptions);
  }

  deleteCategory(id : number):Observable<any>{
    return this.http.post(CATEGORY_API + 'delete/' +id,httpOptions);
  }

}
