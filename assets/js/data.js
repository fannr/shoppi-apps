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

let cartBasket = JSON.parse(localStorage.getItem("cart")) || [];