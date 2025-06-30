import React, { useState } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const currencies = [
    'USD', 'INR', 'EUR', 'GBP', 'JPY',
    'AUD', 'CAD', 'CHF', 'CNY', 'SGD'
  ];

  const currencySymbols = {
  USD: '$', INR: '₹', EUR: '€', GBP: '£', JPY: '¥',
  AUD: 'A$', CAD: 'C$', CHF: 'Fr', CNY: '¥', SGD: 'S$'
};


const exchangeRates = {
  USD: { INR: 85.57, EUR: 0.88, GBP: 0.74, JPY: 144.10, AUD: 0.64, CAD: 1.37, CHF: 0.82, CNY: 7.20, SGD: 1.29 },
  INR: { USD: 0.0117, EUR: 0.0103, GBP: 0.0086, JPY: 1.683, AUD: 0.0075, CAD: 0.016, CHF: 0.0096, CNY: 0.084, SGD: 0.015 },
  EUR: { USD: 1.135, INR: 97.18, GBP: 0.84, JPY: 163.74, AUD: 0.73, CAD: 1.56, CHF: 0.93, CNY: 8.18, SGD: 1.47 },
  GBP: { USD: 1.35, INR: 116.05, EUR: 1.19, JPY: 195.0, AUD: 0.88, CAD: 1.86, CHF: 1.11, CNY: 9.76, SGD: 1.75 },
  JPY: { USD: 0.0069, INR: 0.59, EUR: 0.0061, GBP: 0.0051, AUD: 0.0044, CAD: 0.0095, CHF: 0.0057, CNY: 0.050, SGD: 0.0089 },
  AUD: { USD: 1.55, INR: 133.74, EUR: 1.37, GBP: 1.14, JPY: 226.10, CAD: 2.14, CHF: 1.28, CNY: 11.23, SGD: 2.01 },
  CAD: { USD: 0.73, INR: 62.39, EUR: 0.64, GBP: 0.54, JPY: 106.0, AUD: 0.47, CHF: 0.60, CNY: 5.15, SGD: 0.94 },
  CHF: { USD: 1.22, INR: 104.28, EUR: 1.07, GBP: 0.90, JPY: 175.1, AUD: 0.78, CAD: 1.67, CNY: 8.60, SGD: 1.56 },
  CNY: { USD: 0.139, INR: 11.91, EUR: 0.122, GBP: 0.102, JPY: 20.34, AUD: 0.089, CAD: 0.194, CHF: 0.116, SGD: 0.181 },
  SGD: { USD: 0.775, INR: 66.31, EUR: 0.681, GBP: 0.57, JPY: 129.8, AUD: 0.50, CAD: 1.06, CHF: 0.64, CNY: 5.52 },
};




  const convert = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
      }

    else if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else {
      const rate = exchangeRates[fromCurrency]?.[toCurrency];
      if (rate) {
        setConvertedAmount((amount * rate).toFixed(2));
      } else {
        setConvertedAmount('Rate unavailable');
      }
    }
  };

  const resetForm = () => {
  setAmount("");
  setFromCurrency('USD');
  setToCurrency('INR');
  setConvertedAmount(null);
};

  

  return (
    <div className={`converter ${darkMode ? 'dark' : ''}`}>
      <h2>💱 Currency Converter</h2>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <div className="dropdowns">
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
        <span>→</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <button onClick={convert}>🪙Convert</button>
      {convertedAmount !== null && (
  <>
    <p className="result">
      {amount} {fromCurrency} = {convertedAmount} {toCurrency}
    </p>
    <p className="reverse">
      1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency]?.toFixed(4)} {toCurrency}<br />
      1 {toCurrency} = {(1 / exchangeRates[fromCurrency]?.[toCurrency])?.toFixed(4)} {fromCurrency}
    </p>
  </>
)}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
      <button onClick={resetForm} type="button">🔁 Reset</button>

    </div>
    
  );
};

export default CurrencyConverter;
