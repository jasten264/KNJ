function showProductBox(productId) {
    const boxes = document.querySelectorAll('.category-box');
    boxes.forEach(box => box.classList.add('hidden'));

    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(box => box.classList.remove('active'));

    const productBox = document.getElementById(productId);
    productBox.classList.add('active');
}

function closeProductBox() {
    const activeProductBox = document.querySelector('.product-box.active');
    if (activeProductBox) {
        activeProductBox.classList.remove('active');
    }

    const boxes = document.querySelectorAll('.category-box');
    boxes.forEach(box => box.classList.remove('hidden'));
}

function toggleCart() {
    const cartBox = document.getElementById('cartBox');
    cartBox.classList.toggle('active');
}

document.getElementById('cartLink').addEventListener('click', toggleCart);

function addToCart(event) {
    const button = event.target.closest('.add-to-cart');
    if (!button) return;

    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${image}" alt="${name}" class="cart-item-image">
        <p class="cart-item-name">${name}</p>
        <p class="cart-item-price">$${price}</p>
    `;

    const cartBox = document.getElementById('cartBox');
    if (cartBox.querySelector('p') && cartBox.querySelector('p').textContent === 'Your cart is currently empty.') {
        cartBox.querySelector('p').remove();
    }
    cartBox.appendChild(cartItem);

    alert(`${name} has been added to your cart!`);
}

document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartCountElement = document.getElementById("cartCount");
    const cartBox = document.getElementById("cartBox");

    function updateCartUI() {
        const cartContent = cartBox.querySelector("p");
        if (cart.length === 0) {
            cartContent.textContent = "Your cart is currently empty.";
        } else {
            cartContent.innerHTML = cart
                .map(
                    (item) =>
                        `<div class='cart-item'>
                            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                            <span>${item.name} - $${item.price}</span>
                        </div>`
                )
                .join("");
        }
        cartCountElement.textContent = cart.length;
        cartCountElement.style.display = cart.length > 0 ? "inline-block" : "none";
    }

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = this.getAttribute("data-price");
            const image = this.getAttribute("data-image");

            cart.push({ name, price, image });
            updateCartUI();
            alert(`${name} has been added to your cart!`);
        });
    });

    document.getElementById("cartLink").addEventListener("click", function (e) {
        e.preventDefault();
        cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
    });

    document.querySelector(".close-cart-btn").addEventListener("click", function () {
        cartBox.style.display = "none";
    });

    document.getElementById("shipNow").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty. Add products to ship.");
        return;
    }

    // List of products to ship
    const shippedProducts = cart.map(item => `${item.name} - $${item.price}`).join('\n');

    // Clear the cart array
    cart.length = 0;

    // Update the cart UI to show it is empty
    updateCartUI();

    // Show alert with shipped products
    alert(`The following products have been shipped:\n\n${shippedProducts}`);
});



    updateCartUI();
});
