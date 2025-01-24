class Item {
    constructor(name, price, description = '') {
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = 1;
    }

    getSubtotal() {
        return this.price * this.quantity;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        const existingItem = this.items.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(item);
        }
    }

    removeItem(itemName) {
        const index = this.items.findIndex(item => item.name === itemName);
        
        if (index !== -1) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity -= 1;
            } else {
                this.items.splice(index, 1);
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
}

const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

const cart = new Cart();

cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
    updateCartModal();
});

cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});

menu.addEventListener("click", (event) => {
    const parentButton = event.target.closest(".add-to-cart-btn");
    
    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        
        const newItem = new Item(name, price);
        cart.addItem(newItem);
        updateCartModal();
    }
});

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    
    cart.items.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <p>${item.name}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p>R$ ${item.getSubtotal().toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item-btn" data-name="${item.name}">Remover</button>
            </div>
        `;
        
        const removeButton = cartItemElement.querySelector('.remove-item-btn');
        removeButton.addEventListener('click', () => {
            cart.removeItem(item.name);
            updateCartModal();
        });
        
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = cart.getTotal().toFixed(2);
    cartCounter.textContent = cart.getItemCount();
}

checkoutBtn.addEventListener('click', () => {
    if (addressInput.value === '') {
        addressWarn.style.display = 'block';
        return;
    }

    alert('Pedido finalizado com sucesso!');
    cart.items = [];
    updateCartModal();
    cartModal.style.display = 'none';
});

addressInput.addEventListener('input', () => {
    if (addressInput.value !== '') {
        addressWarn.style.display = 'none';
    }
});