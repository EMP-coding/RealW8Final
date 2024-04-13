"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const shop_1 = require("./shop");
const shop = new shop_1.Shop();
const user = new user_1.User("Alice", 28);
console.log("Initial cart:");
user.printCart();
console.log("Adding items to cart...");
shop.getItems().forEach(item => user.addToCart(item));
user.printCart();
console.log("Removing 'Coffee Mug' from cart...");
const coffeeMug = shop.getItems().find(item => item.getName() === "Coffee Mug");
if (coffeeMug) {
    user.removeFromCart(coffeeMug);
}
user.printCart();
console.log("Removing one 'Notebook' from cart...");
const notebook = shop.getItems().find(item => item.getName() === "Notebook");
if (notebook) {
    user.removeQuantityFromCart(notebook, 1);
}
user.printCart();
