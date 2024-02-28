class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

const cart = [];

// Add four Roll objects to the cart
const originalRoll = new Roll("Original", "Sugar Milk", 1, 2.49);
const walnutRoll = new Roll("Walnut", "Vanilla Milk", 12, 3.49);
const raisinRoll = new Roll("Raisin", "Sugar Milk", 3, 2.99);
const appleRoll = new Roll("Apple", "Original", 3, 3.49);

cart.push(originalRoll, walnutRoll, raisinRoll, appleRoll);

// Display cart items on the page
function displayCartItems() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; // Clear previous content

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        const glazingPriceAdj = getGlazingPriceAdj(item.glazing);
        const packPriceAdj = getPackPriceAdj(item.size);

        const totalPrice = (item.basePrice + glazingPriceAdj) * packPriceAdj;

        cartItem.innerHTML = `
            <img src="../assets/products/${rolls[item.type].imageFile}" alt="${item.type}">
            <div class="description">
                <p>${item.type} Cinnamon Roll</p>
                <p>Glazing: ${item.glazing}</p>
                <p>Pack Size: ${item.size}</p>
            </div>
            <div class="priceRight">
                <p>$${totalPrice.toFixed(2)}</p>
            </div>
        `;

        cartList.appendChild(cartItem);

        const removeButton = document.createElement("p");
        removeButton.classList.add("removeButton", "underlineBold");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeItem(item.type);
        };

        cartList.appendChild(removeButton);
    });

    updateTotalPrice();
}

function getGlazingPriceAdj(glazing) {
    switch (glazing) {
        case "Original":
        case "Sugar Milk":
            return 0;
        case "Vanilla Milk":
            return 0.5;
        case "Double Chocolate":
            return 1.5;
    }
}

function getPackPriceAdj(size) {
    switch (size) {
        case 1:
            return 1;
        case 3:
            return 3;
        case 6:
            return 5;
        case 12:
            return 10;
    }
}

// Remove items from the cart
function removeItem(type) {
    const index = cart.findIndex(item => item.type === type);
    if (index !== -1) {
        cart.splice(index, 1);
        displayCartItems(); // Update the displayed items
    }
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById("totalPrice");
    const totalPrice = cart.reduce((acc, item) => {
        const glazingPriceAdj = getGlazingPriceAdj(item.glazing);
        const packPriceAdj = getPackPriceAdj(item.size);
        const itemTotalPrice = (item.basePrice + glazingPriceAdj) * packPriceAdj;
        return acc + itemTotalPrice;
    }, 0);
    totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
}

// Call displayCartItems function when the page loads
window.onload = displayCartItems;
