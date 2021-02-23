import { Category } from "./category.model";


export interface Product {
    title?: string;
    price?: number;
    imageUrl?: string;
    category?: string;
    key?: string;
}