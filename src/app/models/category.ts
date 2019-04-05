import { Subcategory } from './subcategory';

export interface Category {
  category: string;
  subcategories: Subcategory[];
}

