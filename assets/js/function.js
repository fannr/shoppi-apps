function formatRupiah(nominal) {
  var reverse = nominal.toString().split("").reverse().join(""),
    ribuan = reverse.match(/\d{1,3}/g);

  ribuan = ribuan.join(".").split("").reverse().join("");

  return ribuan;
}

function totalPrice(isTrue) {
  if (cartBasket.length > 0) {
    let total = cartBasket
      .map((cart) => {
        let { id, item } = cart;
        let search = cardList.find((card) => card.id === cart.id);

        return search.price * item;
      })
      .reduce((a, b) => a + b, 0);

    if (isTrue) {
      document.querySelector(".price_cart").innerHTML = formatRupiah(total);
    } else {
      document.querySelector(
        ".cart_info .price"
      ).innerHTML = `Rp ${formatRupiah(total)}`;
    }
  } else {
    if (isTrue) {
      document.querySelector(".price_cart").innerHTML = formatRupiah(0);
    } else {
      document.querySelector(
        ".cart_info .price"
      ).innerHTML = `Rp ${formatRupiah(0)}`;
    }
  }
}

const update = (id, isTrue) => {
  if (isTrue) {
    const items = cartBasket.map((c) => c.item).reduce((a, b) => a + b, 0);
    document.querySelector(".nav_items").innerHTML = `${cartBasket.length},`;
    document.querySelector(".total").innerHTML = `(${items})`;
  } else {
    let search = cartBasket.find((c) => c.id === id);
    if (search === undefined) return;
    document.querySelector(`[data-id="${id}"]`).innerHTML = search.item;
  }
};

const close = document.querySelector(".close");
close.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".containerAlert").classList.remove("active");
  document.querySelector(".alert").classList.remove("active");
});

function deleteCart(id, isTrue) {
  cartBasket = cartBasket.filter((cart) => cart.id != id);

  localStorage.setItem("cart", JSON.stringify(cartBasket));

  if (isTrue) {
    update(null, true);
    loadCart();
    totalPrice(true);
  } else {
    update(null, false);
    totalPrice(false);
    loadCartView();
  }
}

const tbody = document.querySelector("tbody");
function loadCart(isTrue) {
  const productList = document.querySelector(".product_list");

  if (isTrue) {
    if (cartBasket.length > 0) {
      productList.innerHTML = cartBasket
        .map((cart) => {
          let search = cardList.find((card) => card.id === cart.id);

          return `<div class="product_cart">
        <div>
          <img
            class="img_cart"
            src="assets/img/product_${search.img}.jpg"
            alt="${search.title}"
          />
          <div>
            <p class="title_cart">${search.title} </p>
            <p class="qty_list">x${
              cart.item
            } <span class="price">(Rp. ${formatRupiah(search.price)})</span></p>
          </div>
        </div>
        <p class="product_price">Rp. ${formatRupiah(
          search.price * cart.item
        )}</p>
        <i class="bi bi-x-lg" onclick=deleteCart(${cart.id}, ${true})></i>
      </div>`;
        })
        .join("");
    } else {
      productList.innerHTML = `<p class="empty">
        Product is Empty!
      </p>`;
    }
  } else {
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
      )}</p> <i class="bi bi-x-lg" onclick="deleteCart(${
            c.id
          }, ${false})"></i></td>
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
}
