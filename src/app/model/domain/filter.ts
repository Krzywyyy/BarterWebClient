import {ProductCategory} from '../enums/product-category.enum';
import {Specialization} from '../enums/specialization.enum';

export class Filter {
  searchText: string;
  category: ProductCategory;
  specialization: Specialization;
}
