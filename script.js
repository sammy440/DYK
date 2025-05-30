const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showNextSlide() {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % totalSlides;
  slides[currentIndex].classList.add("active");
  updateSlidePosition();
}

function showPrevSlide() {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  slides[currentIndex].classList.add("active");
  updateSlidePosition();
}

function updateSlidePosition() {
  const slidesContainer = document.querySelector(".slides");
  const offset = -currentIndex * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;
}

setInterval(showNextSlide, 5000);
/////////////////////////////
class ShoppingCart {
  constructor() {
    this.cart = [];
    this.bindEvents();
    this.loadCart();
    this.updateCartDisplay();
  }

  bindEvents() {
    // Add click handlers for add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productItem = e.currentTarget.closest(".product-item");
        this.addToCart({
          id: productItem.dataset.id,
          name: productItem.dataset.name,
          price: parseFloat(productItem.dataset.price),
          image: productItem.dataset.image,
          quantity: 1,
        });
      });
    });

    // Show/hide cart modal
    document
      .querySelector(".btn--show-modal")
      .addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#cart").classList.remove("hidden");
        document.querySelector(".overlay").classList.remove("hidden");
      });

    document.querySelector(".overlay").addEventListener("click", () => {
      document.querySelector("#cart").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
    });
  }

  addToCart(product) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push(product);
    }

    this.saveCart();
    this.updateCartDisplay();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  updateCartDisplay() {
    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    const cartBtn = document.querySelector("#cart-btn");
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#cart").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
    });
    // Clear current cart display
    cartItems.innerHTML = "";

    // Calculate total
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Update cart icon total
    cartTotal.innerHTML = `$${total.toFixed(2)}`;
    document.querySelector("#cart-total").innerHTML = `$${total.toFixed(2)}`;

    // Add items to cart display
    this.cart.forEach((item) => {
      const itemElement = document.createElement("li");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${
        item.name
      }" style="width: 50px; height: 50px; object-fit: cover;">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <button class="remove-item" data-id="${item.id}">×</button>
      `;

      // Add remove button handler
      itemElement
        .querySelector(".remove-item")
        .addEventListener("click", () => {
          this.removeFromCart(item.id);
        });

      cartItems.appendChild(itemElement);
    });
  }
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", () => {
  new ShoppingCart();
});
///////////////////////
document.querySelector(".btn-show-modal").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".dop-container").classList.toggle("jaz");
});
