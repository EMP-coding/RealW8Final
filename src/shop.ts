import { Item } from './item';
import { User } from './user';

export class Shop {
    private items: Item[];
    static myUser: User | undefined;

    constructor() {
        this.items = [
            new Item("Basic Tee", 20, "A plain t-shirt"),
            new Item("Coffee Mug", 10, "For your morning coffee"),
            new Item("Notebook", 5, "A5 size, 100 pages"),
            new Item("Water Bottle", 15, "Keeps drinks hot or cold"),
            new Item("Backpack", 50, "Fits all your items"),
            new Item("Sneakers", 80, "Comfortable and stylish")
        ];
    }

    showItems(): void {
        const mainImg = document.getElementById('mainImg');
        if (mainImg) {
            mainImg.style.display = 'none';
        }
        const shopDiv = document.getElementById('shop');
        if (!shopDiv) {
            console.error("Shop div element not found.");
            return;  
        }
        shopDiv.innerHTML = ''; 
        this.items.forEach(item => {
            const itemElement = item.itemElement();
            shopDiv.appendChild(itemElement);
    
            
            item.addItemEventListener((item: Item) => {
                if (Shop.myUser) {
                    Shop.myUser.addToCart(item); 
                    
                    this.updateCart();
                } else {
                    console.error('User not logged in.');
                }
            });
        });
    }

    updateCart(): void {
        const cartDiv = document.getElementById('cart') as HTMLDivElement | null;
        if (!cartDiv) {
            console.error("Cart div element not found.");
            return;
        }
        if (!Shop.myUser || Shop.myUser.getCart().length === 0) {
            cartDiv.innerHTML = "<p>The cart is empty.</p>";
        } else {
            const cartContents = Shop.myUser.cartHTMLElement();
            cartDiv.innerHTML = '';
            cartDiv.appendChild(cartContents);
        }
        
    }
    

    static loginUser(event: Event): void {
        event.preventDefault(); 
        const nameInput = document.getElementById('nameInput') as HTMLInputElement;
        const ageInput = document.getElementById('ageInput') as HTMLInputElement;

        if (nameInput && nameInput.value && ageInput && ageInput.value) {
            Shop.myUser = new User(nameInput.value, parseInt(ageInput.value));
            const loginForm = document.getElementById('loginForm') as HTMLDivElement | null;
            if (loginForm) {
                loginForm.style.display = 'none';
                const shop = new Shop();
                shop.showItems();
                shop.updateCart();
            } else {
                console.error("Login form not found.");
            }
        }
    }
}
