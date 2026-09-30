const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

convertBtn.addEventListener("click", convertCurrency);

async function convertCurrency() {

    const amount = Number(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount <= 0) {
        result.textContent = "Please enter a valid amount";
        return;
    }

    if (from === to) {
        result.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    try {

        result.textContent = "Converting...";

        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`
        );

        const data = await response.json();

        const convertedAmount = amount * data.rate;

        result.textContent =
            `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;

    } catch (error) {

        console.error(error);

        result.textContent = "Unable to convert currency";
    }
}