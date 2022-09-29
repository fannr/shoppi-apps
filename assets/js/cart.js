loadCart(false);
totalPrice(false);

const plusCart = (id) => {
  const search = cartBasket.find((cart) => cart.id === id);

  if (search === undefined) return;
  else {
    search.item += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cartBasket));
  loadCart(false);
  totalPrice(false);
  update(id, false);
};

const minusCart = (id) => {
  const search = cartBasket.find((cart) => cart.id === id);

  if (search === undefined) return;
  if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  cartBasket = cartBasket.filter((c) => c.item != 0);

  checkItemsLength();
  totalPrice(false);
  loadCart(false);
  update(id, false);
  localStorage.setItem("cart", JSON.stringify(cartBasket));
};

const deleteAll = document.querySelector(".deleteAll");
deleteAll.addEventListener("click", function (e) {
  e.preventDefault();
  let user = confirm("yakin?");

  if (user) {
    cartBasket = [];
    localStorage.setItem("cart", JSON.stringify(cartBasket));
    loadCart(false);
    totalPrice(false);
    checkItemsLength();
  }
});

const buy = document.querySelector(".buy");
buy.addEventListener("click", function (e) {
  e.preventDefault();

  cartBasket = [];
  localStorage.setItem("cart", JSON.stringify(cartBasket));
  loadCart(false);
  totalPrice(false);
  document.querySelector(".containerAlert").classList.add("active");

  document.querySelector(".desc").innerHTML = `You success buying the items.`;

  setTimeout(() => {
    document.querySelector(".alert").classList.add("active");
  }, 300);
});

checkItemsLength();
function checkItemsLength() {
  if (cartBasket.length == 0) {
    document.querySelector(".deleteAll").classList.add("isTrue");
    document.querySelector(".buy").classList.add("isTrue");
  } else {
    document.querySelector(".deleteAll").classList.remove("isTrue");
    document.querySelector(".buy").classList.remove("isTrue");
  }
}
