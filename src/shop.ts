import { Item } from './item';

export class Shop {
    private items: Item[];

    constructor() {
        this.items = [
            new Item("Basic Tee", 20, "A plain t-shirt"),
            new Item("Coffee Mug", 10, "For your morning coffee"),
            new Item("Notebook", 5, "A5 size, 100 pages")
        ];
    }

    getItems(): Item[] {
        return this.items;
    }
}
