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
        const existingItem = this.cart.find(cartItem => cartItem.getId() === item.getId());
        if (existingItem) {
            existingItem.incrementQuantity();
        } else {
            
            this.cart.push(item);
        }
    }

    removeFromCart(itemId: string): void {
        this.cart = this.cart.filter(item => item.getId() !== itemId);
    }

    removeQuantityFromCart(itemId: string, quantity: number): void {
        console.log(`Debugging: Trying to remove ${quantity} from item ID ${itemId}`);
        this.cart = this.cart.reduce((newCart: Item[], item) => {
            if (item.getId() === itemId) {
                if (item.getQuantity() > quantity) {
                    item.setQuantity(item.getQuantity() - quantity);
                    newCart.push(item);
                    console.log(`Debugging: Decremented quantity. New quantity: ${item.getQuantity()}`);
                } else {
                    console.log(`Debugging: Removing item as quantity is not greater than ${quantity}`);
                    
                }
            } else {
                newCart.push(item); 
            }
            return newCart;
        }, []);
    
        console.log("Cart after removal:", this.cart);
    }

    cartTotal(): number {
        return this.cart.reduce((total, item) => total + (item.getPrice() * item.getQuantity()), 0);
    }

    printCart(): void {
        console.log(`${this.name}'s Cart:\n${'='.repeat(50)}`);
        this.cart.forEach(item => {
            console.log(`Item: ${item.getName()} | Price: $${item.getPrice()}`);
        });
        console.log(`${'='.repeat(50)}\nTotal: $${this.cartTotal().toFixed(2)}\n${'='.repeat(50)}`);
    }

    static loginUser(): User {
        const nameInput = document.getElementById('nameInput') as HTMLInputElement;
        const ageInput = document.getElementById('ageInput') as HTMLInputElement;

        if (!nameInput.value) {
            throw new Error("'Name' is a required input field, please enter your name");
        }
        if (!ageInput.value) {
            throw new Error("'Age' is a required input field, please enter your age");
        }
        return new User(nameInput.value, parseInt(ageInput.value));
    }

    cartHTMLElement(): HTMLDivElement {
        const cartDiv = document.createElement('div');
        cartDiv.className = "cart-items";
    
        this.cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `<span>${item.getName()} (Quantity: ${item.getQuantity()}) - </span>
                                 <span>Price: $${item.getPrice().toFixed(2)}</span>
                                 <button class='remove-one-button' data-item-id='${item.getId()}'>Remove One</button>
                                 <button class='remove-all-button' data-item-id='${item.getId()}'>Remove All</button>`;
            cartDiv.appendChild(itemDiv);
        });
    
        
        const totalDiv = document.createElement('div');
        totalDiv.className = "cart-total";
        totalDiv.textContent = `Total: $${this.cartTotal().toFixed(2)}`;
        cartDiv.appendChild(totalDiv);
    
       
        const cartContainer = document.querySelector('#cart');
        if (cartContainer) {
            cartContainer.innerHTML = '';  
            cartContainer.appendChild(cartDiv);
        } else {
            console.error("Cart container not found.");
        }
    
        this.addRemoveEventListeners();
        return cartDiv;
    }

    initializeEventListeners(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.addRemoveEventListeners();
        });
    }
    
    addRemoveEventListeners(): void {
        const cartContainer = document.getElementById('cart');
        if (!cartContainer) {
            console.error("Cart container not found for event listeners.");
            return;
        }
        
        if (!cartContainer.getAttribute('listener')) {
            console.log("Attaching event listeners to cart container");
            cartContainer.setAttribute('listener', 'true'); 
    
            cartContainer.addEventListener('click', event => {
                const target = event.target as HTMLElement;
                console.log("Clicked inside cart container", target);
    
                if (target && target.matches('.remove-one-button')) {
                    const itemId = target.dataset.itemId;
                    console.log("Remove one button clicked, Item ID:", itemId);
                    if (itemId) {
                        this.removeQuantityFromCart(itemId, 1);
                        this.refreshCartDisplay();
                    }
                } else if (target && target.matches('.remove-all-button')) {
                    const itemId = target.dataset.itemId;
                    console.log("Remove all button clicked, Item ID:", itemId);
                    if (itemId) {
                        this.removeFromCart(itemId);
                        this.refreshCartDisplay();
                    }
                }
            });
        } else {
            console.log("Event listeners already attached to cart container");
        }
    }

    

    refreshCartDisplay(): void {
        console.log("Refreshing cart display");
        const newCartDisplay = this.cartHTMLElement();
        const cartContainer = document.getElementById('cart');
        if (cartContainer) {
            cartContainer.innerHTML = '';
            cartContainer.appendChild(newCartDisplay);
            this.addRemoveEventListeners();  
            console.error("Failed to find cart container for refreshing");
        }
    }
}
