import { Item, IItem } from './item';

export interface IFeaturingItems {
  items: IItem[];
}

export class FeaturingItems implements IFeaturingItems {

  items: IItem[] = [];
  public constructor(init?: Partial<FeaturingItems>) {
    Object.assign(this, init);
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
