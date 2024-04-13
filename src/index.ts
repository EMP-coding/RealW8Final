import { User } from './user';
import { Shop } from './shop';

const shop = new Shop();
const user = new User("Alice", 28);

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
