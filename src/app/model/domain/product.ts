import { ProductCategory } from '../enums/product-category.enum';
import { Specialization } from '../enums/specialization.enum';

export class Product {
    id: number;
    title: string;
    description: string;
    image: string;
    address: string;
    latitude: number;
    longitude: number;
    category: ProductCategory;
    specialization: Specialization;
    userId: number;
}
