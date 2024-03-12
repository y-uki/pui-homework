class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

// Define cartSet as a Set
const cartSet = new Set();


// Adding item to cartSet
function addNewItem(rollType, rollGlazing, packSize, basePrice) {
    const cartItem = new Roll(rollType, rollGlazing, packSize, basePrice);
    cartSet.add(cartItem);
    return cartItem;
}

// Calculate glazing price adjustment
function getGlazingPriceAdj(glazing) {
    switch (glazing) {
        case "Keep Original":
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
        case "1":
            return 1;
        case "3":
            return 3;
        case "6":
            return 5;
        case "12":
            return 10;
    }
}

// Display cart items on the page
function displayCartItems() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; // Clear previous content

    cartSet.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        const glazingPriceAdj = getGlazingPriceAdj(item.glazing);
        const packPriceAdj = getPackPriceAdj(item.size);

        const totalPrice = (item.basePrice + glazingPriceAdj) * packPriceAdj;
        console.log(totalPrice);

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


// Remove items from the cart
function removeItem(type) {
    // Find the item in cartSet with the matching type
    const itemToRemove = Array.from(cartSet).find(item => item.type === type);
    
    // If the item exists, remove it from cartSet
    if (itemToRemove) {
        cartSet.delete(itemToRemove);
        
        // Update the total price
        updateTotalPrice();
        
        // Convert cartSet to array and update local storage
        const cartItemArray = Array.from(cartSet);
        const cartItemArrayString = JSON.stringify(cartItemArray);
        localStorage.setItem('storedItems', cartItemArrayString);
        
        // Update the displayed items
        displayCartItems();
    }
}

// Update total price displayed on the page
function updateTotalPrice() {
    const totalPriceElement = document.getElementById("totalPrice");
    const totalPrice = Array.from(cartSet).reduce((acc, item) => {
        const glazingPriceAdj = getGlazingPriceAdj(item.glazing);
        const packPriceAdj = getPackPriceAdj(item.size);
        const itemTotalPrice = (item.basePrice + glazingPriceAdj) * packPriceAdj;
        return acc + itemTotalPrice;
    }, 0);
    totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
}

// Call displayCartItems function when the page loads
window.onload = function() {
    displayCartItems();
};

// Retrieve cart items from local storage
function retrieveFromLocalStorage() {
    const cartItemArrayString = localStorage.getItem('storedItems');
    const cartItemArray = JSON.parse(cartItemArrayString);
    if (cartItemArray) {
        cartItemArray.forEach(itemData => {
            const cartItem = addNewItem(itemData.type, itemData.glazing, itemData.size, itemData.basePrice);
        });
    }
}

// If there are items stored in local storage, retrieve them
if (localStorage.getItem('storedItems') != null) {
    retrieveFromLocalStorage();
}

console.log(localStorage.getItem('storedItems'))