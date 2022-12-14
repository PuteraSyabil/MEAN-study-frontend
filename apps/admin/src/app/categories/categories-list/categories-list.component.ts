import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService, Category} from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories:Category[]=[];

  constructor(private router:Router,private confirmationService: ConfirmationService,private messageService: MessageService,private categoriesServices: CategoriesService) { }

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(categoryId: string)
  {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesServices.deleteCategory(categoryId).subscribe((response)=>{
          this._getCategories();
          this.messageService.add({severity:'success', summary:'Success', detail:'Category is deleted'});
        },
        (error)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Category is not deleted'});
        })
      },
      reject: (type)=>{ 
      }
    });
  }

  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories(){
    this.categoriesServices.getCategories().subscribe(cats=>{
      this.categories=cats;
    })
  }

}
