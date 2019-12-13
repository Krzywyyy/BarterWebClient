import {Component, OnInit} from '@angular/core';
import {Product} from '../model/domain/product';
import {ProductService} from '../services/api/product.service';
import {Router} from '@angular/router';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Specialization} from '../model/enums/specialization.enum';
import {GoogleAddressService} from '../services/api/google-address.service';
import {GoogleApiKey} from '../model/maps/google-api-key';

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
  address = '';
  added: boolean;

  constructor(private productService: ProductService,
              private googleService: GoogleAddressService,
              private router: Router) {
  }

  ngOnInit() {
    this.added = false;
    this.product.title = '';
    this.product.description = '';
  }

  addNewProduct() {
    this.googleService.getCoordinates(this.address, GoogleApiKey.apiKey).subscribe(
      response => {
        this.product.address = response.results[0].formatted_address;
        this.product.latitude = response.results[0].geometry.location.lat;
        this.product.longitude = response.results[0].geometry.location.lng;
        this.productService.save(this.product).subscribe(
          () => {
            this.added = true;
            this.scrollToTop();
          }
        );
      }
    );
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (() => {
      this.product.image = reader.result.toString().split('base64,')[1];
    });

    reader.readAsDataURL(file);
  }

  productAdded(): boolean {
    return this.added;
  }

  goToMyProducts() {
    this.router.navigateByUrl('/products/my');
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
