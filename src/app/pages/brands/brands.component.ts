import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  private readonly brandsService = inject(BrandsService);
  brands: IBrand[] = [];
  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getbrands();
  }

  getbrands() {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
        console.log(this.brands);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
