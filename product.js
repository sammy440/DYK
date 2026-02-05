"use strict";

const products = {
    1: { id: 1, name: "DYK Yellow Shoes", price: 200, image: "shoe.jpg" },
    2: { id: 2, name: "DYK Red Shoes", price: 150, image: "heel.jpg" },
    3: { id: 3, name: "Dark Brown Jeans", price: 120, image: "panttii.jpg" },
    4: { id: 4, name: "Brown Trousers", price: 200, image: "dahh.jpg" },
    5: { id: 5, name: "Sleek Black Jacket", price: 250, image: "jacket.jpg" },
    6: { id: 6, name: "Red Sunglass", price: 100, image: "red-glass.jpg" },
    7: { id: 7, name: "Dark Leather Purse", price: 100, image: "accessory-fashion-shopping-woman-purse.jpg" },
    8: { id: 8, name: "Light Brown Purse", price: 120, image: "bagg.jpg" },
    9: { id: 9, name: "Bangle Bracelet", price: 130, image: "expand.jpg" },
    11: { id: 11, name: "Bangle", price: 150, image: "shoe.jpg" }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

function addToCart(id) {
    if (!products[id]) {
        console.error(`Product ${id} not found`);
        return;
    }

    const product = products[id];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li style="padding: 1rem; text-align: center; color: #7f8c8d;">Your cart is empty</li>';
        cartTotal.textContent = 'Total: $0.00';
        cartCount.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <p style="font-weight: 700;">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(message) {
    const prompt = document.getElementById('prompt');
    prompt.textContent = message;
    prompt.classList.add('show');
    setTimeout(() => {
        prompt.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});


