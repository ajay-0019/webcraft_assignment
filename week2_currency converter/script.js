const input = document.getElementById("value-input");
const result = document.getElementById("result");
const label = document.getElementById("conversion-label");
const swapBtn = document.getElementById("swap-btn");

let isUsdToInr = true;
const rate = 83; // Example: 1 USD = 83 INR

function convert(value, isUsdToInr) {
  return isUsdToInr ? value * rate : value / rate;
}

function updateConversion() {
  const val = parseFloat(input.value);
  if (isNaN(val) || val <= 0) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  const converted = convert(val, isUsdToInr);
  result.textContent = isUsdToInr
    ? `$${val} = ₹${converted.toFixed(2)}`
    : `₹${val} = $${converted.toFixed(2)}`;
}

function updateLabel() {
  label.textContent = isUsdToInr ? "USD → INR" : "INR → USD";
}

input.addEventListener("input", updateConversion);

swapBtn.addEventListener("click", () => {
  isUsdToInr = !isUsdToInr;
  updateLabel();
  updateConversion();
});

// Initialize
updateLabel();
