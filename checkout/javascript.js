const nameUser = document.getElementById("name-user");
const phoneUser = document.getElementById("phone-user");
const addressUser = document.getElementById("address-user");
const processOrder = document.getElementById("process-order");
const errorUser = document.getElementById("error-user");

processOrder.addEventListener("click", () => {
  if (!nameUser.value) {
    errorUser.innerHTML = "Invalid name user";
    return;
  }
  if (!phoneUser.value) {
    errorUser.innerHTML = "Invalid phone user";
    return;
  }
  if (!addressUser.value) {
    errorUser.innerHTML = "Invalid address user";
    return;
  }

  const bodyUser = {
    nameUser,
    phoneUser,
    addressUser,
  };
  console.log("bodyUser", bodyUser);

  localStorage.removeItem('products');
  window.location.href = '/success';
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
