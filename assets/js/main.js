const hamburger = document.querySelector("#listHamburger");

hamburger.addEventListener("click", function () {
  this.parentElement.classList.toggle("active");
});

document.addEventListener("click", function (e) {
  if (
    e.target.id != "listHamburger" &&
    e.target.id != "navbarNav" &&
    e.target.id != "menuBar"
  ) {
    document.querySelector(".responsive").classList.remove("active");
  }

  if (
    e.target.className != "cart_list show" &&
    e.target.className != "link_items" &&
    e.target.className != "total" &&
    e.target.className != "bi bi-cart3" &&
    e.target.className != "nav_items" &&
    e.target.className != "cart_title" &&
    e.target.className != "product_cart" &&
    e.target.className != "checkout" &&
    e.target.className != "bi bi-x-lg" &&
    e.target.className != "product_list" &&
    e.target.className != "product_price" &&
    e.target.className != "img_cart" &&
    e.target.className != "title_cart" &&
    e.target.className != "qty_list" &&
    e.target.className != "total_cart" &&
    e.target.className != "price_cart" &&
    e.target.className != "price_total" &&
    e.target.className != "empty" &&
    e.target.className != "desc_total"
  ) {
    document.querySelector(".cart_list").classList.remove("show");
  }
});

const elA = document.querySelectorAll(".nav_center2 a");
for (const a of elA) {
  a.addEventListener("click", function () {
    document.querySelector(".responsive").classList.remove("active");
  });
}

loadCard();
loadCart();
function loadCart() {
  const productList = document.querySelector(".product_list");

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
      <p class="product_price">Rp. ${formatRupiah(search.price * cart.item)}</p>
      <i class="bi bi-x-lg" onclick=deleteCart(${cart.id})></i>
    </div>`;
      })
      .join("");
  } else {
    productList.innerHTML = `<p class="empty">
      Product is Empty!
    </p>`;
  }
}

totalPrice(true);

function deleteCart(id) {
  cartBasket = cartBasket.filter((cart) => cart.id != id);

  localStorage.setItem("cart", JSON.stringify(cartBasket));
  update(null, true);
  loadCart();
  totalPrice(true);
}

function loadCard(filter = "dress") {
  const containerCard = document.querySelector(".containerProduct");
  containerCard.innerHTML = cardList
    .filter((c) => filter == c.filter)
    .map(
      (c) => `<div class="card_product" data-filter="${c.filter}">
      <img src="assets/img/product_${c.img}.jpg" alt="${c.title}" />
      <div>
        <p class="title">${c.title}</p>
        <span class="price">Rp ${formatRupiah(c.price)}</span>
      </div>
      <div>
        <p class="descProduct">${c.filter}</p>
        <a onclick="addCart(${c.id})">Add Cart</a>
      </div>
    </div>`
    )
    .join("");

  const card = document.querySelectorAll(".card_product");
  for (const c of card.entries()) {
    setTimeout(() => {
      c[1].classList.add("active");
    }, c[0] * 200);
  }
}

function findList(id) {
  for (const card of cardList) {
    if (card.id === id) {
      return card;
    }
  }

  return null;
}

const addCart = (id) => {
  const search = cartBasket.find((cart) => cart.id === id);

  const filter = findList(id);

  if (search === undefined) {
    cartBasket.push({
      id,
      item: 1,
    });

    document.querySelector(".containerAlert").classList.add("active");
    document.querySelector(
      ".desc"
    ).innerHTML = `Your product ${filter.title} has been successfully, <br />
    check in cart for the details.`;

    setTimeout(() => {
      document.querySelector(".alert").classList.add("active");
    }, 300);
  } else {
    search.item += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cartBasket));

  const elCart = document.querySelector(".animateCart");
  elCart.classList.add("active");
  setTimeout(() => {
    elCart.classList.remove("active");
  }, 300);

  update(null, true);
  loadCart();
  totalPrice(true);
};

update(null, true);

const close = document.querySelector(".close");
close.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".containerAlert").classList.remove("active");
  document.querySelector(".alert").classList.remove("active");
});

const filter = document.querySelectorAll("#listFilter");

for (const f of filter) {
  f.addEventListener("click", function () {
    document.querySelector("#listFilter.active").classList.remove("active");
    this.classList.add("active");

    loadCard(this.textContent.toLowerCase());
  });
}

const elNavlink = document.querySelectorAll(".nav_center1 a");

const navLinkIntersection = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        for (const elLink of elNavlink) {
          elLink.classList.remove("active");

          if (e.target.id === elLink.dataset.navLink) {
            elLink.classList.add("active");
          }
        }
      }
    }
  },
  { threshold: ".3" }
);

const elSection = document.querySelectorAll("[data-scroll-banner]");

for (const el of elSection) {
  navLinkIntersection.observe(el);
}

const linkItems = document.querySelector(".link_items");

linkItems.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".cart_list").classList.toggle("show");
});
