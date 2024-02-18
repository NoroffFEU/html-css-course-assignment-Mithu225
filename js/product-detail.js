function onAddToCart(id) {
  var carts = getValueFromStore(STORAGE_CARTS) || [];
  var products = getValueFromStore(STORAGE_PRODUCTS) || [];
  var currentproduct = products.find((item) => item.id === id);

  var exitproduct = carts.find((item) => item.id === id);
  if (exitproduct) {
    carts = carts.map((item) => {
      if (item.id === id) {
        item.quantity = item.quantity + 1;
        return item;
      }

      return item;
    });
  } else {
    currentproduct.quantity = 1;
    carts.push(currentproduct);
  }

  setValueToStore(STORAGE_CARTS, carts);

  showToast(`Added ${currentproduct.title} to your cart`);
  updateCartNumber();
}

function generateProductDetailHTML(product, sizesHTML) {
  return ` 
      <div class="product-detail-left">
        <div class="box-product-detail-left">
          <a href="product-detail.html"
            ><img
              src="${product.image.url}"
              alt="${product.image.alt}"
              class="top-collection-1"
          /></a>
        </div>
      </div>
      <div class="product-detail-right">
        <h2 class="product-text-detail">${product.title}</h2>
        <p class="product-price">
            <span class='${product.onSale ? "product-price-old" : ""}'>
                ${product.price}
            </span>
            ${
              product.onSale
                ? "<span>" + product.discountedPrice + "</span>"
                : ""
            }
        </p>
        <img
          class="selection-product"
          src="${product.image.url}"
          alt="${product.image.alt}"
        />
        <img
          class="selection-product"
          src="${product.image.url}"
          alt="${product.image.url}"
        />
        <div class="collection-product-color">
          <p class="text-color">
            COLOR :
            <ion-icon class="color1" size="small" name="ellipse"></ion-icon>
            <ion-icon class="color2" size="small" name="ellipse"></ion-icon>
            <ion-icon class="color3" size="small" name="ellipse"></ion-icon>
          </p>
        </div>
        <div class="text-right-detail">
          <p class="text-detail">SIZE:</p>
          <p class="select-size">Please select size</p>
          <p class="find-size">Find Your Size</p>
        </div>
        <div class="box-selection-size">
            <div class="size-list">
              ${sizesHTML}
            </div>
        </div>
        <div class="quantity-product">
          <label for="quantity">Quantity</label>

          <div class="quantity-control" data-quantity="">
            <button class="quantity-btn" data-quantity-minus="">
              <ion-icon size="large" name="remove"></ion-icon>
            </button>
            <input
              type="number"
              class="quantity-input"
              value="1"
              step="1"
              min="1"
              max=""
              name="quantity"
            />
            <button class="quantity-btn" data-quantity-plus="">
              <ion-icon size="large" name="add"></ion-icon>
            </button>
          </div>
        </div>
        <div class="button-cart" onclick="onAddToCart('${product.id}')">
          <button class="button button-dark">ADD TO CART</button></a

          <a href="checkout.html">
            <button class="button button-error">BUY NOW</button></a
          >
        </div>
        <div class="product-description">
          <p>Product details:</p>
          <p class="text-description">
           ${product.description}
          </p>
        </div>
     
    </div>`;
}

async function renderProductDetail() {
  var productID = getValueFromStore(STORAGE_PRODUCTID);

  if (productID == undefined) {
    window.location.href = "/error.html";
    return;
  }

  var API_ENDPOIN_DETAIL = `${API_ENDPOINT}/${productID}`;
  var result = await getAPI(API_ENDPOIN_DETAIL);
  var product = result.data;

  var sizesGenerateHTML = generateProductSizesHTML(product.sizes);

  var datamap = generateProductDetailHTML(product, sizesGenerateHTML);

  var productListSelector = document.querySelector(".product-detail");
  productListSelector.innerHTML = datamap;

  function generateProductTitleHTML(title) {
    return `<h3 class="product-detail-link">PRODUCT / MEN / ${title}</h3>`;
  }
  var datatitle = generateProductTitleHTML(product.title);
  var productTitleSelector = document.querySelector(".breadcrumb");
  productTitleSelector.innerHTML = datatitle;
}

renderProductDetail();
