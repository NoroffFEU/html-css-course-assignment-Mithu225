var API_ENDPOINT = "https://v2.api.noroff.dev/rainy-days";
var STORAGE_PRODUCTS = "products";
var STORAGE_PRODUCTID = "productID";
var STORAGE_CARTS = "carts";
var FILTER_GENDERS = "filter:genders";
var FILTER_CATEGORIES = "filter:categories";
var TOAST_SELECTOR_NAME = "#toast-message";
var CART_HEADER_SELECTOR_NAME = "#your-cart-number";

var bodySelector = document.querySelector("body");
var store = {};

function renderLoading(isLoading) {
  if (isLoading) {
    var temp = document.createElement("div");
    temp.className = "spinner-container";
    temp.innerHTML = `<div class="spinner"></div>`;
    bodySelector.appendChild(temp);
  } else {
    const existed = document.querySelector(".spinner-container");
    if (existed) {
      existed.remove();
    }
  }
}

async function getAPI(url) {
  renderLoading(true);
  var respone = await fetch(url);
  var result = await respone.json();
  renderLoading(false);
  return result;
}

function stringifyValue(value) {
  return JSON.stringify(value);
}

function parseString(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function setValueToStore(key, value) {
  store[key] = value;
  localStorage.setItem(key, stringifyValue(value));
}

function getValueFromStore(key) {
  return store[key] || parseString(localStorage.getItem(key));
}

function getValuesUniqued(values) {
  var valuesUniqued = [];
  values.forEach((item) => {
    if (!valuesUniqued.includes(item)) {
      valuesUniqued.push(item);
    }
  });

  return valuesUniqued;
}

function updateCartNumber() {
  var carts = getValueFromStore(STORAGE_CARTS);
  var cartLength = carts
    .map((item) => item.quantity)
    .reduce((prev, cur) => prev + cur, 0);

  var cartHeaderSelector = document.querySelector(CART_HEADER_SELECTOR_NAME);
  cartHeaderSelector.innerHTML = `<div class="your-cart-number">${cartLength}</div>`;
}

updateCartNumber();
