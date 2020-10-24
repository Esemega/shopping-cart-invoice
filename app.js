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

// ******** TASKS LIST
//add attributes to each element
//Add input to each product with an event change listener

const ol = document.createElement("ol");

for (const product of products) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const input = document.createElement("input");

    const spanTextContent = product.description + " - " + product.price + "€/ud."
    
    span.textContent = spanTextContent;

    li.appendChild(span);
    li.appendChild(input);
    ol.appendChild(li);
}

const shoppingList = document.getElementById("shopping-list");
shoppingList.appendChild(ol);

// ************* Calculating subtotal, iva and total when clicking button
const getSubtotal = product => product.price*product.units;
const getIva = product => product.price*(product.tax/100);
const getTotal = product => getSubtotal(product) + getIva(product);

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
}

document.getElementById("calculate").addEventListener("click", buttonHandler);