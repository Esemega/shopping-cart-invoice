// Constants
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Input data
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

// ************* Calculating subtotal, iva and total when clicking button
const getSubtotal = (product) => product.price * product.units;
const getIva = (product) => product.price * product.units * (product.tax / 100);
const getTotal = (product) => getSubtotal(product) + getIva(product);

const buttonHandler = () => {
  const subtotal = document.getElementById("subtotal");
  const iva = document.getElementById("iva");
  const total = document.getElementById("total");

  let subtotalValue = 0;
  let ivaValue = 0;
  let totalValue = 0;

  for (const product of products) {
    subtotalValue += getSubtotal(product);
    ivaValue += getIva(product);
    totalValue += getTotal(product);
  }

  subtotal.innerText = subtotalValue.toFixed(2) + " €";
  iva.innerText = ivaValue.toFixed(2) + " €";
  total.innerText = totalValue.toFixed(2) + " €";
};

document
  .getElementById("button-calculate")
  .addEventListener("click", buttonHandler);

// ************* Creating HTML product list

const createHtmlList = () => {
  const li = document.createElement("li");
  li.setAttribute("class", "shopping-list");
  return li;
};

const createHtmlSpan = (product) => {
  const span = document.createElement("span");
  span.setAttribute("class", "product-description-price");

  const spanTextContent = product.description + " - " + product.price + "€/ud.";
  span.textContent = spanTextContent;

  return span;
};

const createHtmlInput = (product) => {
  const input = document.createElement("input");
  input.setAttribute("class", "product-units");
  input.setAttribute("type", "number");
  input.setAttribute("value", 0);
  input.setAttribute("min", 0);
  input.setAttribute("max", product.stock);
  input.addEventListener("change", (event) => {
    if (event.target.value < 0 || event.target.value > product.stock) {
      let alertMesage = '';
      if (event.target.value < 0) {
        event.target.value = 0;
        alertMesage= `Las unidades no pueden ser inferior a 0.`;
      } else {
        product.units = product.stock;
        event.target.value = product.stock;
        alertMesage=`Las unidades no pueden superar el stock (${product.stock} unidades).`;
      }

      alert(alertMesage);
      input.classList.add("error-stock");
      
    } else {
      product.units = event.target.value;
      input.classList.remove("error-stock");
    }
  });
  return input;
};

const showProductsList = () => {
  const ol = document.createElement("ol");

  for (const product of products) {
    const li = createHtmlList();

    const span = createHtmlSpan(product);

    const input = createHtmlInput(product);

    li.appendChild(span);
    li.appendChild(input);
    ol.appendChild(li);
  }

  const shoppingList = document.getElementById("shopping-list-container");
  shoppingList.appendChild(ol);
};

showProductsList();