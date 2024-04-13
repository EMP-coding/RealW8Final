import { Item } from './item';
import { v4 as uuidv4 } from 'uuid';

export class User {
    private id: string;
    private name: string;
    private age: number;
    private cart: Item[];

    constructor(name: string, age: number) {
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.cart = [];
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    setName(value: string) {
        this.name = value;
    }

    getAge(): number {
        return this.age;
    }
    setAge(value: number) {
        this.age = value;
    }

    getCart(): Item[] {
        return this.cart;
    }

    addToCart(item: Item): void {
        this.cart.push(item);
    }

    removeFromCart(item: Item): void {
        this.cart = this.cart.filter(cartItem => cartItem.getId() !== item.getId());
    }

    removeQuantityFromCart(item: Item, quantity: number): void {
        const filteredCart: Item[] = [];
        let countToRemove = quantity;
        for (const cartItem of this.cart) {
            if (cartItem.getId() === item.getId() && countToRemove > 0) {
                countToRemove--;
            } else {
                filteredCart.push(cartItem);
            }
        }
        this.cart = filteredCart;
    }

    cartTotal(): number {
        return this.cart.reduce((total, item) => total + item.getPrice(), 0);
    }

    printCart(): void {
        console.log(`${this.name}'s Cart:\n${'='.repeat(50)}`);
        this.cart.forEach(item => {
            console.log(`Item: ${item.getName()} | Price: $${item.getPrice()}`);
        });
        console.log(`${'='.repeat(50)}\nTotal: $${this.cartTotal().toFixed(2)}\n${'='.repeat(50)}`);
    }
}
