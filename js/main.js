async function renderMain(data) {
  var result = await getAPI(API_ENDPOINT);
  setValueToStore(STORAGE_PRODUCTS, result.data);

  var products = data || result.data;
  setFilterValues(products);

  var datamap = products.map((item) => {
    var sizesGenerateHTML = generateProductSizesHTML(item.sizes);
    return generateProductItemHTML(item, sizesGenerateHTML);
  });

  var topProductListSelector = document.querySelector(".top-product-list");
  topProductListSelector.innerHTML = datamap.join("");
}

renderMain();
renderFilter((data) => renderMain(data));
