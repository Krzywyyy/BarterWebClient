import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/api/product.service';
import {Product} from '../model/domain/product';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {

  private userProducts: Array<Product>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.findAllUserProducts().subscribe(
      data => this.userProducts = data
    );
  }
}
