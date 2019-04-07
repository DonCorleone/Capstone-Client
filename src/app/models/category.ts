import { Subcategory } from './subcategory';
import { Deserializable } from './deserializable.model';

export interface ICategory {
  category: string;
  subcategories: Subcategory[];
  deserialize(input: any): ICategory;
}

export class Category implements ICategory, Deserializable<Category> {

  category: string;
  subcategories: Subcategory[];

  constructor() {
  }

  deserialize(input: any): Category {
    Object.assign(this, input);
    this.subcategories = input.subcategories.map((subcategory) => new Subcategory().deserialize(subcategory));
    return this;
  }
}
