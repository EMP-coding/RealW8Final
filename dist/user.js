"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(name, age) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.age = age;
        this.cart = [];
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getAge() {
        return this.age;
    }
    setAge(value) {
        this.age = value;
    }
    getCart() {
        return this.cart;
    }
    addToCart(item) {
        this.cart.push(item);
    }
    removeFromCart(item) {
        this.cart = this.cart.filter(cartItem => cartItem.getId() !== item.getId());
    }
    removeQuantityFromCart(item, quantity) {
        const filteredCart = [];
        let countToRemove = quantity;
        for (const cartItem of this.cart) {
            if (cartItem.getId() === item.getId() && countToRemove > 0) {
                countToRemove--;
            }
            else {
                filteredCart.push(cartItem);
            }
        }
        this.cart = filteredCart;
    }
    cartTotal() {
        return this.cart.reduce((total, item) => total + item.getPrice(), 0);
    }
    printCart() {
        console.log(`${this.name}'s Cart:\n${'='.repeat(50)}`);
        this.cart.forEach(item => {
            console.log(`Item: ${item.getName()} | Price: $${item.getPrice()}`);
        });
        console.log(`${'='.repeat(50)}\nTotal: $${this.cartTotal().toFixed(2)}\n${'='.repeat(50)}`);
    }
}
exports.User = User;
