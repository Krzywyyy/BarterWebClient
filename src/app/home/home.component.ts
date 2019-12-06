import { Component, OnInit } from '@angular/core';
import { Product } from '../model/domain/product';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.findAll(1).subscribe(
      data => this.products = data
    );
  }

}
