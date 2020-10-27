//********************** INPUT DATA *********************
// Constants
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// products array
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

//********************** Calculating subtotal, iva and total when clicking button *********************

//1- Basic claculate functions
const getSubtotal = (product) => product.price * product.units;
const getIva = (product) => product.price * product.units * (product.tax / 100);
const getTotal = (product) => getSubtotal(product) + getIva(product);

//2. Button event listener:
const buttonHandler = () => {
  //2.a. Get html elements
  const subtotal = document.getElementById("subtotal");
  const iva = document.getElementById("iva");
  const total = document.getElementById("total");

  //2.b. Initalizing values to 0
  let subtotalValue = 0;
  let ivaValue = 0;
  let totalValue = 0;

  //2.c. calculate the values
  for (const product of products) {
    subtotalValue += getSubtotal(product);
    ivaValue += getIva(product);
    totalValue += getTotal(product);
  }

  //2.d. adding values to html elements
  subtotal.innerText = subtotalValue.toFixed(2) + " €";
  iva.innerText = ivaValue.toFixed(2) + " €";
  total.innerText = totalValue.toFixed(2) + " €";
};

//3. Adding event listener to the button
document.getElementById("button-calculate").addEventListener("click", buttonHandler);

//********************** Creating HTML product list *********************

//1. Basic functions
//1.a. Function that create and set a li html element
const createHtmlList = () => {
  const li = document.createElement("li");
  li.setAttribute("class", "shopping-list");
  return li;
};
//1.b. Function that create and set a span html element
const createHtmlSpan = (product) => {
  const span = document.createElement("span");
  span.setAttribute("class", "product-description-price");

  const spanTextContent = product.description + " - " + product.price + "€/ud.";
  span.textContent = spanTextContent;

  return span;
};

//1.c. Function that create and set a input html element, before you can find a function 
//that evaluate if all input are equal to zero and a function that disable the button if all inputs are equal to zero

//1.c.I Checking if all input have a value of zero
const isAllInputsEqualToZero = () => {
  let arrayOfInputs = document.getElementsByTagName("input");
  var isAllZero = true;

  for (let i = 0; i < arrayOfInputs.length; i++) {
    if (arrayOfInputs[i].value !== "0") {
      isAllZero = false;
      break;
    }
  }
  return isAllZero;
};

//1.c.II Enable or disabling button depending of inputs values, checked in function isAllInputsEqualToZero()
const enableOrDisableButton = () => {
  if (isAllInputsEqualToZero()) {
    document.getElementById("button-calculate").disabled = true; // Disabled
  } else {
    document.getElementById("button-calculate").disabled = false; // Enabled
  }
};

//1.c.III Function that create and set a input html element
const createHtmlInput = (product) => {
  const input = document.createElement("input");
  input.setAttribute("class", "product-units");
  input.setAttribute("type", "number");
  input.setAttribute("value", 0);
  input.setAttribute("min", 0);
  input.setAttribute("max", product.stock);
  input.addEventListener("change", (event) => {
    //if value in input is negative or more than stock show a message to user, else product.units = input value
    if (event.target.value < 0 || event.target.value > product.stock) {
      let alertMesage = "";
      //if value in input is negative
      if (event.target.value < 0) {
        event.target.value = 0;
        alertMesage = `Las unidades no pueden ser inferior a 0.`;
      } else { //if value in input is more than stock
        product.units = product.stock;
        event.target.value = product.stock;
        alertMesage = `Las unidades no pueden superar el stock (${product.stock} unidades).`;
      }

      alert(alertMesage);
      input.classList.add("invalid-value");
    } else {
      product.units = event.target.value;
      input.classList.remove("invalid-value");
    }

    enableOrDisableButton();
  });
  return input;
};

//2. using functions created above to create an li for each item in the product list (li>> span + input), 
//append it to a ordered list (ol) and appent the ol to the element with id ="shopping-list-container"

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

//3. Executing 
showProductsList();
