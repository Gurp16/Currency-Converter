const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector('form button');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon = document.querySelector("i");

icon.addEventListener('click', () => {
    console.log("Clicked");
    [fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
    updateSelectedOptions();

    // Update the exchange rate
    updateExchangeRate();

    updateFlag(fromCurr);
    updateFlag(toCurr);
});

function updateSelectedOptions() {
    for (let select of dropdown) {
        for (let option of select.options) {
            if (select.name === "from" && option.value === fromCurr.value) {
                option.selected = 'selected';
            } else if (select.name === "to" && option.value === toCurr.value) {
                option.selected = 'selected';
            }
        }
    }
}

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = 'selected';
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = 'selected';
        }

        select.append(newOption);
    }

    select.addEventListener('click', async (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
};

window.document.addEventListener("DOMContentLoaded", () => {
    updateExchangeRate();
});

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
