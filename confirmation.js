document.addEventListener('DOMContentLoaded', () => {
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const deliveryDate = localStorage.getItem('deliveryDate');
    
   
    const summaryTableBody = document.querySelector('#order-summary-table tbody');
    const totalAmountElem = document.querySelector('#total-amount');
    const deliveryDateElem = document.getElementById('delivery-date');

    
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

    
    deliveryDateElem.textContent = deliveryDate || 'Not specified';
    populateOrderSummary();
});
