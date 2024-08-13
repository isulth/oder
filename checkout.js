document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryTableBody = document.querySelector('#order-summary-table tbody');
    const totalAmountElem = document.querySelector('#total-amount');

    const populateOrderSummary = () => {
        summaryTableBody.innerHTML = ''; 
        let totalAmount = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            summaryTableBody.appendChild(row);
            totalAmount += item.price * item.quantity;
        });

        totalAmountElem.textContent = totalAmount.toFixed(2); 
    };

    populateOrderSummary();

   
    document.querySelector('#checkout-form').addEventListener('submit', (e) => {
        e.preventDefault(); 
        if (e.target.checkValidity()) {
            const deliveryDate = document.getElementById('delivery-date').value;
            localStorage.setItem('deliveryDate', deliveryDate);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'confirmation.html';
        } else {
            alert('Please fill out all fields correctly.');
        }
    });
});
