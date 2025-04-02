Array.prototype.sortByNumProp = function(property, reverse = false) {
    const sign = reverse ? -1 : 1;
    return this.sort((a, b) => (parseFloat(a[property]) - parseFloat(b[property])) * sign);
};

Array.prototype.sortByStrProp = function(property, reverse = false) {
    const sign = reverse ? -1 : 1;
    return this.sort((a, b) => compareStrings(a[property]) - (b[property]) * sign);
}

const number = 15;
const brands = [
    "TechWear",
    "Garmin",
    "Samsung",
    "Apple",
    "Xiaomi",
];

let smartwatches = generateSmartwatches(number, brands);
const copiedSmartwatches = [...smartwatches];
const catalog = document.querySelector(".catalog");
renderCatalog(catalog, smartwatches);

const availableButton = document.querySelector(".button.available");
const navailableButton = document.querySelector(".button.navailable");
const sbpaButton = document.querySelector(".button.sbpa");
const sbpdButton = document.querySelector(".button.sbpd");
const sbraButton = document.querySelector(".button.sbra");
const sbrdButton = document.querySelector(".button.sbrd");
const sbnaButton = document.querySelector(".button.sbna");
const sbndButton = document.querySelector(".button.sbnd");
const discountButton = document.querySelector(".button.discount");
const initialButton = document.querySelector(".button.initial");
const searchInput = document.querySelector(".search_input");
const sortSelect = document.querySelector("#sort-select");
const priceFromInput = document.querySelector("#price-from");
const priceToInput = document.querySelector("#price-to");
const brandSelect = document.querySelector("#brand-select");

brands.forEach(brand => {
    const brandOptionElement = document.createElement("option");
    brandOptionElement.value = brand.toLowerCase();
    brandOptionElement.innerHTML = `${brand}`;
    brandSelect.append(brandOptionElement);
});

availableButton.addEventListener('click', () => {
    const updated = smartwatches.filter(smartwatch => smartwatch.isAvailable);
    renderCatalog(catalog, updated);
});

navailableButton.addEventListener('click', () => {
    const updated = smartwatches.filter(smartwatch => !smartwatch.isAvailable);
    renderCatalog(catalog, updated);
});

sbpaButton.addEventListener('click', () => {
    renderCatalog(catalog, smartwatches.sortByNumProp('price'));
});

sbpdButton.addEventListener('click', () => {
    renderCatalog(catalog, smartwatches.sortByNumProp('price', true));
});

sbraButton.addEventListener('click', () => {
    renderCatalog(catalog, smartwatches.sortByNumProp('rating'));
});

sbrdButton.addEventListener('click', () => {
    renderCatalog(catalog, smartwatches.sortByNumProp('rating', true));
});

sbnaButton.addEventListener('click', () => {
    renderCatalog(catalog, smartwatches.sort((a, b) => {
        const aModel = a.model;
        const aBrand = a.brand;
        const aName = `${aBrand} ${aModel}`;
        const bModel = b.model;
        const bBrand = b.brand;
        const bName = `${bBrand} ${bModel}`;
        return compareStrings(aName, bName);
    }));
});

sbndButton.addEventListener('click', () => {
    renderCatalog(catalog, smartwatches.sort((a, b) => {
        const aModel = a.model;
        const aBrand = a.brand;
        const aName = `${aBrand} ${aModel}`;
        const bModel = b.model;
        const bBrand = b.brand;
        const bName = `${bBrand} ${bModel}`;
        return compareStrings(aName, bName) * -1;
    }));
});

discountButton.addEventListener('click', () => {
    if (smartwatches[0].price.includes("%")) {
        return;
    }

    smartwatches = smartwatches.map(smartwatch => ({
        ...smartwatch,
        price: `${Math.floor((smartwatch.price * 0.8))} (-20%)`,
    }));
    renderCatalog(catalog, smartwatches);
});

initialButton.addEventListener('click', () => {
    smartwatches = [...copiedSmartwatches];
    renderCatalog(catalog, smartwatches);
})

searchInput.addEventListener('input', () => {
    const updated = smartwatches.filter(smartwatch => {
        const model = smartwatch.model.toLowerCase();
        const brand = smartwatch.brand.toLowerCase();
        const name = `${brand} ${model}`;
        const searchString = searchInput.value.toLowerCase();

        return name.includes(searchString);
    });
    renderCatalog(catalog, updated);
});

sortSelect.addEventListener('change', () => {
    const value = sortSelect.value;
    if (value === "name") {
        smartwatches.sort((a, b) => {
            const aName = `${a.brand} ${a.model}`;
            const bName = `${b.brand} ${b.model}`;
            return compareStrings(aName, bName);
        });
    } else if (value === "price" || value === "rating") {
        smartwatches.sortByNumProp(value);
    }

    renderCatalog(catalog, smartwatches);
});

[priceFromInput, priceToInput].forEach(input => {
    input.addEventListener('keydown', event => {
        if (['e', 'E', '+', '-'].includes(event.key)) {
            event.preventDefault();
        }
    });

    input.addEventListener('input', () => {
        const priceFrom = priceFromInput.value ? Number(priceFromInput.value) : -Infinity;
        const priceTo = priceToInput.value ? Number(priceToInput.value) : Infinity;
        const updated = smartwatches.filter(smartwatch => {
            const price = parseFloat(smartwatch.price);
            return price >= priceFrom && price <= priceTo;
        });
    
        renderCatalog(catalog, updated);
    });
});

brandSelect.addEventListener('change', () => {
    const value = brandSelect.value;
    if (!value) {
        return renderCatalog(catalog, smartwatches);
    }
    const updated = smartwatches.filter(smartwatch => {
        return smartwatch.brand.toLowerCase() === value;
    });

    renderCatalog(catalog, updated);
});

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

function compareStrings(a, b) {
    return a < b ? -1 : 1;
}
