const displayContainer = document.getElementById("productContainer");
const homePage = document.getElementById("cover");

var products ;

var cart ={} ;

async function loadDataAndDisplay() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    products = data.shoes;
    displayData(products);
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

function displayData(items) {
  displayContainer.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const product = items[i];
    displayContainer.innerHTML += `
      <div class="card col-md-3 p-2 cardItem">
        <div class="card-body">
          <h3 class="card-title">${product.title}</h3>
          <h6 class="card-subtitle mb-2 text-body-secondary">${product.brand}</h6>
          <img src="${product.img}" class="card-img-top" alt="..." height="200" width="200" >
          <h3 class=" mt-2">${product.price}</h3>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button class="cart" id=${product.id}>Cart</button>
          <button class="buy">Buy</button>
        </div>
      </div>
    `;
  }
  



const cartItems = document.querySelectorAll('.cart');
  for (let i = 0; i < cartItems.length; i++) {
  const button = cartItems[i];
  button.addEventListener('click', () => {
  const productId = button.id;
      
    if (cart.hasOwnProperty(productId)) {
      cart[productId] += 1;
      button.textContent = "added";
      button.style.color = 'green';
      
      console.log('Already have product:',productId,cart[productId]);
    } else { 
      cart[productId] = 1;
      console.log('Added product:', cart[productId]);
      button.textContent = "remove";
      button.style.color = 'red'; //this is just for testing
    }
  });
}


}

loadDataAndDisplay();

function filterProducts(searchInput) {
  
let filteredProducts = [];
  for(let i=0 ; i<products.length;i++)
  {
    if((products[i].title.toLowerCase().includes(searchInput.toLowerCase()) ) || (products[i].brand.toLowerCase().includes(searchInput.toLowerCase()) ))
    {
      filteredProducts.push(products[i]);
    }
  }

  if(filteredProducts.length!==0){
     displayData(filteredProducts);
     displayContainer.scrollIntoView({ behavior: 'smooth' });

     
  }
  else{
    displayContainer.innerHTML = `<h1>Oops we dont have ${searchInput} right now</h1>`;
    displayContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

document.querySelector("#search").addEventListener("click", () => {
  const searchInput = document.querySelector("#searchInp").value;
  if(searchInput.trim().length===0)
    alert("Kindly enter search value");
  else{
  filterProducts(searchInput);
  //homePage.style.height = "0";
  // homePage.innerHTML = displayContainer.innerHTML;
  // displayContainer.innerHTML = '';
  document.querySelector("#searchInp").value='';
   //to make the display container empty
  }
});



document.querySelector("#my_cart").addEventListener("click", () => {
 
getCart();
  
});

function getCart(){
  let cartStore = []
  for(let id in cart)
  {
    if(cart.hasOwnProperty(id))
    {
      cartStore.push(products[id-1]);
    }
  }
  console.log(cartStore);
  
  displayCartData(cartStore);
  displayContainer.scrollIntoView({ behavior: 'smooth' });
   

}

function displayCartData(items) {
  displayContainer.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    const product = items[i];
    displayContainer.innerHTML += `
      <div class="card col-md-3 p-2 cardItem">
        <div class="card-body">
          <h3 class="card-title">${product.title}</h3>
          <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
          <img src="${product.img}" class="card-img-top" alt="..." height="350" width="350">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button class="cartRemove bg-danger" id=${product.id}>Remove</button>

          <a href="#" class="btn btn-primary">Buy</a>
           <button class="" id=${product.id}>${cart[product.id]}</button>

        </div>
      </div>
    `;
  }




  const cartRemoveItems = document.querySelectorAll('.cartRemove');

  for (let i = 0; i < cartRemoveItems.length; i++) 
  {
  const button = cartRemoveItems[i];
  button.addEventListener('click', () => {
  const productId = button.id;

    if (cart.hasOwnProperty(productId)) {
      console.log('clicked');
      delete cart[productId];
      getCart();

    } else {
      cart[productId] = 1;
      console.log('Added product:', cart[productId]);
    }
  });
}

if(cartRemoveItems.length==0)
{
  displayContainer.innerHTML = `<h1>Add something to cart</h1>;
  <a href=index.html>Go to home page</a>`;
  
}
}

