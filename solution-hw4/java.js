// Empty Cart

const cart = [];

//URL Parameter

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll")

//New Header

const newHeader = document.getElementById("rollName");
newHeader.innerHTML = rollType + " Cinnamon Roll";

//New Image

const newImage = document.getElementById("productDetail");
newImage.src = "../assets/products/" + rolls[rollType].imageFile;

// New Price

const newPrice = document.getElementById("addPrice");
newPrice.innerHTML = "$" + rolls[rollType].basePrice;


// Define glazing option dropdown

const original = {
    name: "Keep Original",
    priceAd: 0
};

const sugar = {
    name: "Sugar Milk",
    priceAd: 0
};

const vanilla = {
    name: "Vanilla Milk",
    priceAd: 0.5
};

const chocolate = {
    name: "Double Chocolate",
    priceAd: 1.5
};

const allGlazing = [original, sugar, vanilla, chocolate];

// Changing Glazing Option

var glazeOptions = document.getElementById("glazing");

for (let i = 0; i < allGlazing.length; i++) {
    var glaze = document.createElement("option");
    glaze.innerHTML = allGlazing[i].name;
    glaze.value = allGlazing[i].priceAd;
    glazeOptions.appendChild(glaze);
};

// Define pack size option dropdown

const pack1 = {
    name: "1",
    priceAd: 1
};

const pack3 = {
    name: "3",
    priceAd: 3
};

const pack6 = {
    name: "6",
    priceAd: 5
};

const pack12 = {
    name: "12",
    priceAd: 10
};

const allPack = [pack1, pack3, pack6, pack12];

// Changing Pack Size

var packSize = document.getElementById("size");

for (let i = 0; i < allPack.length; i++) {
    var pack = document.createElement("option");
    pack.innerHTML = allPack[i].name;
    pack.value = allPack[i].priceAd;
    packSize.appendChild(pack);
};

// Base Price
const basePrice = rolls[rollType].basePrice

// Change Price

function changePrice() {
    var glazing = document.getElementById("glazing");
    var size = document.getElementById("size");
    var num = size.value;
    var priceAdj = parseFloat(glazing.value);
    let change = (basePrice + priceAdj) * num;
    var price = document.getElementById("addPrice");
    price.innerHTML = "$" + change.toFixed(2);
};

// Add to cart

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

function addCart() {
    const add = new Roll(rollType, allGlazing[glazeOptions.selectedIndex].name, allPack[packSize.selectedIndex].name, rolls[rollType].basePrice);
    cart.push(add);
    console.log(add);
    console.log(cart);
    console.log(JSON.stringify(cart));
}