import {Component, OnInit} from '@angular/core';
import {Product} from '../model/domain/product';
import {ProductService} from '../services/product.service';
import {Router} from '@angular/router';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Specialization} from '../model/enums/specialization.enum';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  private product: Product = new Product();
  categories = ProductCategory;
  categoryKeys = Object.keys(this.categories);
  specializations = Specialization;
  specializationKeys = Object.keys(this.specializations);

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
  }

  addNewProduct() {
    this.productService.save(this.product);sss
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (ev => {
      this.product.image = reader.result.toString().split('base64,')[1];
    });

    reader.readAsDataURL(file);
  }
}
