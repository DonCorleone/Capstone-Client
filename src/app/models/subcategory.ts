import { Item } from './item';
import { Deserializable } from './deserializable.model';

export interface ISubcategory {
  name: string;
  items: Item[];
}

export class Subcategory implements ISubcategory, Deserializable<Subcategory> {

  name: string;
  items: Item[];

  deserialize(input: any): Subcategory {
    Object.assign(this, input);
    this.items = input.items.map((item) => new Item().deserialize(item));
    return this;
  }
}
