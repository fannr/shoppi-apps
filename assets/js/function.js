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
