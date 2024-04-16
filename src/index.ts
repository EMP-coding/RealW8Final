import './main.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Shop } from './shop'; 


document.addEventListener('DOMContentLoaded', () => {
    const shop = new Shop();  
    shop.showItems();  

});


const loginButton = document.querySelector('.loginbutton'); 
if (loginButton) {
    loginButton.addEventListener('click', (event) => {
        if (event) {
            Shop.loginUser(event);
        } else {
            console.error('Event is undefined');
        }
    });
} else {
    console.error('Login button not found');
}
