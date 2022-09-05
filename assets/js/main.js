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

let cartBasket = JSON.parse(localStorage.getItem("cart")) || [];
const cardList = [
  {
    id: 1,
    title: "Bag 1",
    img: "bag",
    price: 10000,
    filter: "bag",
  },
  {
    id: 2,
    title: "Bag 2",
    img: "bag2",
    price: 20000,
    filter: "bag",
  },
  {
    id: 3,
    title: "Bag 3",
    img: "bag3",
    price: 30000,
    filter: "bag",
  },
  {
    id: 4,
    title: "Bag 4",
    img: "bag4",
    price: 40000,
    filter: "bag",
  },
  {
    id: 5,
    title: "Dress",
    img: "dress",
    price: 50000,
    filter: "dress",
  },
  {
    id: 6,
    title: "Dress 2",
    img: "dress2",
    price: 60000,
    filter: "dress",
  },
  {
    id: 7,
    title: "Dress 3",
    img: "dress3",
    price: 70000,
    filter: "dress",
  },
  {
    id: 8,
    title: "Dress 4",
    img: "dress4",
    price: 80000,
    filter: "dress",
  },
  {
    id: 9,
    title: "Hat",
    img: "hat",
    price: 90000,
    filter: "hat",
  },
  {
    id: 10,
    title: "Hat 2",
    img: "hat2",
    price: 100000,
    filter: "hat",
  },
  {
    id: 11,
    title: "Hat 3",
    img: "hat3",
    price: 110000,
    filter: "hat",
  },
  {
    id: 12,
    title: "Hat 4",
    img: "hat4",
    price: 120000,
    filter: "hat",
  },
  {
    id: 13,
    title: "Sneaker",
    img: "sneaker",
    price: 130000,
    filter: "sneaker",
  },
  {
    id: 14,
    title: "Sneaker 2",
    img: "sneaker2",
    price: 140000,
    filter: "sneaker",
  },
  {
    id: 15,
    title: "Sneaker 3",
    img: "sneaker3",
    price: 150000,
    filter: "sneaker",
  },
  {
    id: 16,
    title: "Sneaker 4",
    img: "sneaker4",
    price: 160000,
    filter: "sneaker",
  },
];

function formatRupiah(nominal) {
  var reverse = nominal.toString().split("").reverse().join(""),
    ribuan = reverse.match(/\d{1,3}/g);

  ribuan = ribuan.join(".").split("").reverse().join("");

  return ribuan;
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
totalPrice();
function totalPrice() {
  if (cartBasket.length > 0) {
    let total = cartBasket
      .map((cart) => {
        let { id, item } = cart;
        let search = cardList.find((card) => card.id === cart.id);

        return search.price * item;
      })
      .reduce((a, b) => a + b, 0);

    document.querySelector(".price_cart").innerHTML = formatRupiah(total);
  } else {
    document.querySelector(".price_cart").innerHTML = formatRupiah(0);
  }
}

function deleteCart(id) {
  cartBasket = cartBasket.filter((cart) => cart.id != id);

  localStorage.setItem("cart", JSON.stringify(cartBasket));
  update();
  loadCart();
  totalPrice();
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

  update();
  loadCart();
  totalPrice();
};

const update = () => {
  const items = cartBasket.map((c) => c.item).reduce((a, b) => a + b, 0);
  document.querySelector(".nav_items").innerHTML = `${cartBasket.length},`;
  document.querySelector(".total").innerHTML = `(${items})`;
};
update();

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
