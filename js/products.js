async function renderProducts() {
  var result = await getAPI(API_ENDPOINT);
  var products = result.data;
  setFilterValues(products);

  var datamap = result.data.map((item) => {
    var sizesGenerateHTML = item.sizes
      .map(
        (size) =>
          `<div class="size-item size-${size.toLowerCase()}">${size}</div>`
      )
      .join("");
    return generateProductItemHTML(item, sizesGenerateHTML);
  });

  var topProductListSelector = document.querySelector(".product-list");
  topProductListSelector.innerHTML = datamap.join("");
}

renderProducts();
renderFilter();
