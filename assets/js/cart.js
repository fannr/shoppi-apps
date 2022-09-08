const tbody = document.querySelector("tbody");

loadCartView();
function loadCartView() {
  if (cartBasket.length > 0) {
    tbody.innerHTML = cartBasket
      .map((c, i) => {
        let search = cardList.find((card) => card.id === c.id);

        return `<tr>
    <td>
    <div class="descTitle">
      <p>${++i}.</p>
      <img src="assets/img/product_${search.img}.jpg" alt="${
          search.title
        }" width="60px" height="60px" />
      <div>
        <p>${search.title}</p>
        <small>Rp ${formatRupiah(search.price)}</small>
      </div>
      </div>
    </td>
    <td class="qtyList">
      <div>
      <span class="minus" onclick="minusCart(${
        c.id
      })"><i class="bi bi-dash"></i></span>
      <span class="text" data-id="${c.id}">${c.item}</span>
      <span class="plus" onclick="plusCart(${
        c.id
      })"><i class="bi bi-plus"></i></span>
      </div>
    </td>
    <td >
    <div class="priceSatuan">
    <p>Rp. ${formatRupiah(
      search.price * c.item
    )}</p> <i class="bi bi-x-lg" onclick="deleteCart(${c.id})"></i></td>
        </div>

    
  </tr>`;
      })
      .join(" ");
  } else {
    tbody.innerHTML = `<tr>
    <td class="empty" colspan="3">
      <h2>Cart is Empty!</h2>
    </td>
  </tr>`;
  }
}

totalPrice(false);

const plusCart = (id) => {
  const search = cartBasket.find((cart) => cart.id === id);

  if (search === undefined) return;
  else {
    search.item += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cartBasket));
  loadCartView();
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

  totalPrice(false);
  loadCartView();
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
    loadCartView();
    totalPrice(false);
  }
});

function deleteCart(id) {
  cartBasket = cartBasket.filter((cart) => cart.id != id);

  localStorage.setItem("cart", JSON.stringify(cartBasket));
  update(null, false);
  totalPrice(false);
  loadCartView();
}

const buy = document.querySelector(".buy");
buy.addEventListener("click", function (e) {
  e.preventDefault();

  cartBasket = [];
  loadCartView();
  totalPrice(false);
  document.querySelector(".containerAlert").classList.add("active");

  document.querySelector(
    ".desc"
  ).innerHTML = `Your product  has been successfully, <br />
      check in cart for the details.`;

  setTimeout(() => {
    document.querySelector(".alert").classList.add("active");
  }, 300);
});

const close = document.querySelector(".close");
close.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".containerAlert").classList.remove("active");
  document.querySelector(".alert").classList.remove("active");
});
