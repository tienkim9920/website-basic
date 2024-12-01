const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let { id } = params;

let productDetail = {
  id: "",
  name: "",
  category: "",
  price: 0,
  quantity: 1,
};

let count = 1;
let priceProductRender = 0;
let priceSum = 0;

let txtCount = document.getElementById("txtCount");
let btnIncrease = document.getElementById("btnIncrease");
let btnDecrease = document.getElementById("btnDecrease");
let priceProduct = document.getElementById("price-product");
let addCart = document.getElementById("add-cart");
let popup = document.getElementById("popup");

txtCount.innerHTML = count;

fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("name-product").innerHTML = data.name;
    document.getElementById("category-product").innerHTML = data.company.name;
    priceProduct.innerHTML =
      Intl.NumberFormat("vi-VN", { currency: "VND" }).format(60000) + " VNĐ";
    priceProductRender = 60000;
    priceSum = 60000;

    // GAN THONG TIN PRODUCT DETAIL
    productDetail.id = data.id;
    productDetail.name = data.name;
    productDetail.category = data.company.name;
    productDetail.price = 60000;
  });

btnIncrease.addEventListener("click", () => {
  count += 1;
  txtCount.innerHTML = count;

  priceSum = priceSum + priceProductRender;
  priceProduct.innerHTML =
    Intl.NumberFormat("vi-VN", { currency: "VND" }).format(priceSum) + " VNĐ";

  productDetail.price = priceSum;
});

btnDecrease.addEventListener("click", () => {
  if (count == 1) return;
  count -= 1;
  txtCount.innerHTML = count;

  priceSum = priceSum - priceProductRender;
  priceProduct.innerHTML =
    Intl.NumberFormat("vi-VN", { currency: "VND" }).format(priceSum) + " VNĐ";

  productDetail.price = priceSum;
});

addCart.addEventListener("click", () => {
  addProductToLocalStorage(productDetail, count);
});

const addProductToLocalStorage = (productDetail, quantity) => {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const existingProductIndex = products.findIndex((product) => {
    if (product.id == productDetail.id) return product;
  });

  if (existingProductIndex !== -1) {
    products[existingProductIndex].quantity += quantity;
  } else {
    productDetail.quantity = quantity;
    products.push(productDetail);
  }
 
  popup.innerHTML = 'You have successfully added to cart';
  popup.classList.add('active');
  setTimeout(() => {
    popup.classList.remove('active');
  }, 1500);
  localStorage.setItem('products', JSON.stringify(products));
};
