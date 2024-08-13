document.addEventListener('DOMContentLoaded', () => {
    
    const products = {
        apple: 2.5, banana: 1.2, orange: 3, grapes: 4, mango: 5, pineapple: 3.5,
        tomato: 2, lettuce: 1.5, cucumber: 1.8, pumpkin: 2.2, 'bell pepper': 3, broccoli: 2.5,
        milk: 1.5, cheese: 3, yogurt: 2, curd: 2.5, 'ice cream': 4, butter: 2.5,
        chicken: 5, beef: 7, fish: 6, shrimp: 8,
        flour: 1, sugar: 1.2, salt: 0.5, 'baking powder': 2, oil: 3, spices: 4
    };

    const cart = []; 
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElem = document.querySelector('#total-price');

    
    const updateCart = () => {
        cartTableBody.innerHTML = ''; 
        let totalPrice = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

       
        totalPriceElem.textContent = totalPrice.toFixed(2);
    };

    
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const product = document.getElementById('product').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const price = products[product];

        cart.push({ product, quantity, price }); 
        updateCart(); 
    });

   
    document.getElementById('buy-now').addEventListener('click', (e) => {
        e.preventDefault(); 
    
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        } else {
            alert('Please add items to your cart before proceeding.');
        }
    });
    

    document.getElementById('add-to-favourites').addEventListener('click', () => {
        localStorage.setItem('favouriteOrder', JSON.stringify(cart));
        alert('Order saved as favourite.');
    });

    
    document.getElementById('apply-favourites').addEventListener('click', () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            favouriteOrder.forEach(item => cart.push(item));
            updateCart(); 
        } else {
            alert('No favourite order found.');
        }
    });
});

