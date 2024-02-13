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
}

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
}

function changePrice() {
    var glazing = document.getElementById("glazing");
    var size = document.getElementById("size");
    var num = size.value;
    var priceAdj = parseFloat(glazing.value);
    console.log(priceAdj)
    let change = (2.49 + priceAdj) * num;

    var price = document.getElementById("addPrice");
    console.log(change);
    price.innerHTML = "$" + change.toFixed(2);
}