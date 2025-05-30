"use strict";
// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage
let cartTotal = calculateCartTotal(); // Calculate initial cart total

const modal = document.querySelector("#cart");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".btn--show-modal");
const cartTotalElement = document.querySelector(".cart-total");
const cartItemsList = document.querySelector(".cart-items");

// Calculate cart total
function calculateCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Show cart modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Hide cart modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Initialize cart display
updateCartDisplay();
cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;

// Event listeners for modal
btnShowModal.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Add to cart functionality
document.querySelector(".add-to-cart").addEventListener("click", function (e) {
  e.preventDefault();

  // Get product details
  const productName = document.querySelector(".para-2").textContent;
  const productPrice = document
    .querySelector(".para-3")
    .textContent.split("$")[1]
    .split(" ")[0];
  const quantity =
    parseInt(document.querySelector('input[type="number"]').value) || 1;

  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.name === productName);

  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Create new cart item if it doesn't exist
    const cartItem = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: quantity,
    };
    cart.push(cartItem);
  }

  // Update cart total
  cartTotal = calculateCartTotal();
  cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
  document.querySelector("#cart-total").innerHTML = `$${cartTotal.toFixed(2)}`;

  // Save to localStorage
  saveCart();

  // Update cart display
  updateCartDisplay();

  // Show cart modal
  // openModal(e);
  const prompt = document.querySelector(".prompt");
  prompt.classList.remove("hidden");
  setTimeout(() => prompt.classList.add("show"), 10);

  // Auto-hide after 3 seconds
  setTimeout(() => {
    prompt.classList.remove("show");
    setTimeout(() => prompt.classList.add("hidden"), 300);
  }, 3000);

  // Add close button functionality
  document.querySelector(".close-prompt").addEventListener("click", () => {
    prompt.classList.remove("show");
    setTimeout(() => prompt.classList.add("hidden"), 300);
  });
});

// Update cart display
function updateCartDisplay() {
  cartItemsList.innerHTML = "";
  const cartItems = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");
  const cartBtn = document.querySelector("#cart-btn");
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#cart").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
  });
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="remove-item" data-index="${index}">×</button>
    `;
    cartItemsList.appendChild(li);
  });

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      removeFromCart(index);
    });
  });
}

// Remove item from cart
function removeFromCart(index) {
  const item = cart[index];
  cart.splice(index, 1);

  // Update cart total
  cartTotal = calculateCartTotal();
  cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
  document.querySelector("#cart-total").innerHTML = `$${cartTotal.toFixed(2)}`;

  // Save to localStorage
  saveCart();

  // Update cart display
  updateCartDisplay();

  if (cart.length === 0) {
    closeModal();
  }
}

///////////////////////////////////////////
document.querySelector(".btn-show-modal").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".dop-container").classList.toggle("jaz");
});
