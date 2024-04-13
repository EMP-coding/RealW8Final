"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const item_1 = require("./item");
class Shop {
    constructor() {
        this.items = [
            new item_1.Item("Basic Tee", 20, "A plain t-shirt"),
            new item_1.Item("Coffee Mug", 10, "For your morning coffee"),
            new item_1.Item("Notebook", 5, "A5 size, 100 pages")
        ];
    }
    getItems() {
        return this.items;
    }
}
exports.Shop = Shop;
