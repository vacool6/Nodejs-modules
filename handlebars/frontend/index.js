const productCard = document.getElementById("product-card").innerHTML;
const productCardOutput = document.getElementById("product-card-output");
const API = "https://dummyjson.com/products";

const fetchProducts = async () => {
  try {
    const data = await fetch(API);
    const results = await data.json();
    for (let i of results.products) {
      const div = document.createElement("div");
      const template = Handlebars.compile(productCard);
      console.log(i);
      const html = template(i);

      div.innerHTML = html;

      div.style.margin = "1rem";
      div.style.padding = "1rem";
      div.style.border = "1px solid black";

      productCardOutput.append(div);
    }
  } catch (err) {
    console.log("ERROR");
  }
};

fetchProducts();
