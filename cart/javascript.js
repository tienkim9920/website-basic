const renderCart = () => {
  const bodyCart = document.getElementById("body-cart");
  const totalPriceRender = document.getElementById("total-price");
  const products = JSON.parse(localStorage.getItem("products"));

  const totalPrice = products.reduce((sum, item) => {
    return Number(sum) + (Number(item.price) * Number(item.quantity));
  }, 0);

  totalPriceRender.innerHTML =
    Intl.NumberFormat("vi-VN", { currency: "VND" }).format(totalPrice) + " VNĐ";

  const bodyCartRender = products.map((item) => {
    const stringHtml = `
      <div class="row-cart">
        <div class="col-1">
          <img
            src="../img/bmw-car-1.png"
            width="70px"
            height="auto"
            alt="BMW"
          />
        </div>
        <div class="col-2">${item.name}</div>
        <div class="col-3">${item.quantity}</div>
        <div class="col-4">
          <div class="btn btn-main" id="remove-product-${item.id}">
            <img
              src="../img/bin.png"
              width="20px"
              height="auto"
              alt="BMW"
            />
          </div>
        </div>
      </div>
    `;
    return stringHtml;
  });

  bodyCart.innerHTML = bodyCartRender.join(" ");
  addRemoveListeners();
};

const addRemoveListeners = () => {
  const products = JSON.parse(localStorage.getItem("products"));

  products.forEach((element) => {
    const removeButton = document.getElementById(
      `remove-product-${element.id}`
    );

    if (removeButton) {
      removeButton.addEventListener("click", () => {
        // Lọc những sản phẩm cần xóa
        const newProducts = products.filter((item) => item.id !== element.id);

        // Cap nhat lai localstorage
        localStorage.setItem("products", JSON.stringify(newProducts));

        // Render Cart
        renderCart();
      });
    }
  });
};

renderCart();
