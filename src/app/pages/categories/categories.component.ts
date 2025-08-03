import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  categories: ICategory[] = [];
  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
