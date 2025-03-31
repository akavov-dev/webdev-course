const number = 15;
const brands = [
    "TechWear",
    "Garmin",
    "Samsung",
    "Apple",
    "Xiaomi",
];

const smartwatches = generateSmartwatches(number, brands);
const catalog = document.querySelector(".catalog");
renderCatalog(catalog, smartwatches);

function getRandomItem(array) {
    return array[Math.floor(Math.random(0, 1) * array.length)]
}

function generateSmartwatches(number, brands) {
    const smartwatches = [];

    for (let i = 0; i < number; i++) {
        const image = `./images/smartwatches/smartwatch_${i + 1}.jpg`;
        const model = `Model ${i + 1}`;
        const brand = getRandomItem(brands);
        const price = Math.floor(Math.random() * 100 + 50);
        const rating = (Math.random() * 2 + 3).toFixed(1);
        const isAvailable = !!Math.round(Math.random());

        const smartwatch = {
            image,
            model,
            brand,
            price,
            rating,
            isAvailable,
        };

        smartwatches.push(smartwatch);
    }

    return smartwatches;
}

function renderCatalog(catalog, smartwatches) {
    if (smartwatches.length === 0) {
        catalog.innerHTML = "<p>No smartwatches found</p>";
        return;
    }
    
    catalog.innerHTML = "";
    
    smartwatches.forEach(smartwatch => {
        const smartwatchElement = document.createElement("article");
    
        smartwatchElement.className = "smartwatch";
        smartwatchElement.innerHTML = `
            <img class="smartwatch_image" src="${smartwatch.image}" alt="${smartwatch.brand} ${smartwatch.model}">
            <span class="mask"></span>
            <img class="plus" src="./images/plus.svg" alt="Plus">
            <h3 class="smartwatch_name">${smartwatch.brand} ${smartwatch.model}</h3>
            <div class="smartwatch_price">$${smartwatch.price}</div>
            <div class="smartwatch_rating">${smartwatch.rating}/5</div>
            <div class="smartwatch_availability">${smartwatch.isAvailable ? "A" : "Not a"}vailable</div>
        `;
    
        catalog.append(smartwatchElement);
    });
}
