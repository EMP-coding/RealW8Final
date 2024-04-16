import { v4 as uuidv4 } from 'uuid';

export class Item {
    private id: string;
    private name: string;
    private price: number;
    private description: string;
    private quantity: number; 

    constructor(name: string, price: number, description: string) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = 1; 
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

    getPrice(): number {
        return this.price;
    }
    setPrice(value: number) {
        this.price = value;
    }

    getDescription(): string {
        return this.description;
    }
    setDescription(value: string) {
        this.description = value;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(value: number) {
        this.quantity = value;
    }

    incrementQuantity(): void { this.quantity += 1; }
    decrementQuantity(): void {
        if (this.quantity > 0) {
            this.quantity -= 1;
        }
    }

    itemElement(): HTMLDivElement {
        const card = document.createElement('div');
        card.className = "item-card";  
    
        const nameElement = document.createElement('h2');
        nameElement.textContent = this.getName();
        card.appendChild(nameElement);
    
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = this.getDescription();
        card.appendChild(descriptionElement);
    
        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${this.getPrice().toFixed(2)}`; 
        card.appendChild(priceElement);
    
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.id = `add-to-cart-${this.getId()}`; 
        card.appendChild(addToCartButton);
    
        return card;
    }
    addItemEventListener(addToCartHandler: (item: Item) => void): void {
        const addToCartButton = document.getElementById(`add-to-cart-${this.getId()}`) as HTMLButtonElement | null;
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                console.log('Add to cart button clicked!');
                addToCartHandler(this);
            });
        } else {
            console.error('Add to Cart button not found.');
        }
    }
}