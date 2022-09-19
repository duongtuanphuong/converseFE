import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/_services/product.service';


declare var window:any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listProduct !: Product[];
  newProduct : Product = new Product;
  currentProduct !: Product;
  modalForm :any;
  formValue !: FormGroup;
  uploadedImage ?: File;
  selectedFile ?: FileList;

  constructor(private productService:ProductService,private form:FormBuilder) { }

  ngOnInit(): void {
    this.modalForm = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )

    this.formValue  = this.form.group({
      name : [''],
      description: [''],
      price : [''],
      quantity : [''],
      category : ['']
    })
    this.getListProduct();

  }
  openModal(){

    this.modalForm.show();
  }
  closeModal(){
    this.modalForm.hide();
  }

  onImageUpload(event:any) {
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
  }


  getListProduct(){
    this.productService.getAllProduct().subscribe(res =>{
      this.listProduct = res;
    })
  }

  createProduct(){
    this.newProduct.name = this.formValue.value.name;
    this.newProduct.description = this.formValue.value.description;
    this.newProduct.price = this.formValue.value.price;
    this.newProduct.quantity = this.formValue.value.quantity;
    if(this.selectedFile){
      const file: File | null = this.selectedFile.item(0);
      if(file){
        this.uploadedImage =file;
        this.productService.createProduct(this.newProduct,this.uploadedImage).subscribe(res =>{
          this.getListProduct();
          this.uploadedImage = undefined;
          this.formValue.reset();
          this.closeModal();
        })
      }
      this.selectedFile = undefined;
    }

    
  
  }
  
}
