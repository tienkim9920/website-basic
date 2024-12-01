const renderCategory = () => {
  const categoryCardOption = [
    { label: "Sell Card", value: "sell-card" },
    { label: "Buy Card", value: "buy-card" },
    { label: "Credit Card", value: "credit-card" },
    { label: "Bank Card", value: "bank-card" },
    { label: "Paypal Card", value: "paypal-card" },
    { label: "Momo Card", value: "momo-card" },
  ];

  const categoryRender = categoryCardOption.map((item) => {
    const stringHtml = `<option value="${item.value}">${item.label}</option>`;
    return stringHtml;
  });

  document.getElementById("category-card").innerHTML = categoryRender;
};

const renderTrending = () => {
  let groupTrending = [];

  const isCheckTrendingSome = groupTrending.some(
    (item) => item.price <= "250000"
  );
  if (isCheckTrendingSome) {
    document.getElementById(
      "txt-result-some"
    ).innerHTML = `Tồn tại chiếc xe có giá dưới 250000 VND`;
  } else {
    document.getElementById(
      "txt-result-some"
    ).innerHTML = `Không tồn tại chiếc xe có giá dưới 250000 VND`;
  }

  const isCheckTrendingEvery = groupTrending.every(
    (item) => item.category == "BMW"
  );
  if (isCheckTrendingEvery) {
    document.getElementById("txt-result-every").innerHTML =
      "Tất cả những loại xe này thuộc thương hiệu BMW";
  } else {
    document.getElementById("txt-result-every").innerHTML =
      "Có 1 số loại xe không thuộc thương hiệu BMW";
  }

  const renderResult = (result) => {
    const groupTrendingRender = result.map((item) => {
      const stringHtml = `
      <div class="box-trending" onclick="window.location.href = '/detail/?id=${item.id}'">
        <div class="logo-trending">
          <img src="${item.img}" width="100%" height="auto" alt="BMW1" />
        </div>
        <div class="trending-main">${item.name}</div>
        <div class="trending-sub gray">${item.price}</div>
      </div>`;
      return stringHtml;
    });

    document.getElementById("group-trending").innerHTML =
      groupTrendingRender.join(" ");
  };

  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      groupTrending = data.map((item) => {
        return {
          id: item.id,
          img: "/img/bmw-4.jpg",
          name: item.name,
          price: 310000,
          category: item.company.name,
        };
      });

      renderResult(groupTrending);
    });

  document.getElementById("search-trending").addEventListener("keyup", (e) => {
    const { value } = e.target;
    let resultTrending = [...groupTrending];
    if (value) {
      resultTrending = resultTrending.filter(
        (item) =>
          item.name.toUpperCase().indexOf(String(value).toUpperCase()) !== -1
      );
    }

    renderResult(resultTrending);
  });
};

document.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    document.getElementById("wrapper-header-mobile").classList.add("sticky");
  } else {
    document.getElementById("wrapper-header-mobile").classList.remove("sticky");
  }
});

renderCategory();
renderTrending();
