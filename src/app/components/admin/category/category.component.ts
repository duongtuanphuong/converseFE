import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/_services/category.service';

declare var window:any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listCategory ?: Category[];
  newCategory : Category = new Category;
  currentCategory !: Category;
  modalForm: any;
  formValue !: FormGroup;
  showCreate !: boolean;
  showUpdate !: boolean;

  constructor(private categoryService: CategoryService,private form : FormBuilder) { }

  ngOnInit(): void {

    this.modalForm = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )

    this.formValue  = this.form.group({
      name : ['']
    })
    this.getListCategory();
  }

  onCreate(){
    this.showCreate = true;
    this.showUpdate = false;
    this.openModal();
  }

  onUpdate(s:any){
    this.getCategoryById(s.id);
    this.showCreate = false;
    this.showUpdate = true;
    this.formValue.controls['name'].setValue(s.name);
    this.openModal();
  }

  openModal(){
    this.modalForm.show();
  }

  closeModal(){
    this.modalForm.hide();
  }


  getListCategory(){
    this.categoryService.getAllCategory().subscribe(res =>{
      this.listCategory = res;
    })
  }
  getCategoryById(id: number){
    this.categoryService.getCategoryById(id).subscribe(res => {
      this.currentCategory = res;
    })
  }

  createCategory(){
    this.newCategory.name = this.formValue.value.name;
    this.categoryService.createCategory(this.newCategory).subscribe(res =>{
      this.getListCategory();
      this.closeModal();
      this.formValue.reset();
    })
  }

  updateCategory(){
    this.newCategory.name = this.formValue.value.name;
    this.categoryService.updateCategory(this.currentCategory.id,this.newCategory).subscribe(res =>{
      this.getListCategory();
      this.closeModal();
      this.formValue.reset();
    })
  }

}
