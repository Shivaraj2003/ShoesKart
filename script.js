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
      <div class="card col-md-3 p-2 cardItem " >
        <div class="card-body"  style=" height:50%">
          <h3 class="card-title">${product.title}</h3>
          <h5 class="card-subtitle mb-2 text-body-secondary">${product.brand}</h5>
          <img src="${product.img}" class="card-img-top" alt="..."  style="height: 30%; width:100%">
          <h5 class=" m-3 p-2 border border-black border-2 shadow fw-bolder d-flex justify-content-center">${product.rating} <span class="fa fa-star checked"></span></h5>
          <h5 class=" m-3 p-2 border border-red border-2 shadow fw-bolder d-flex justify-content-center" style="background-color:light${product.color}">${product.color}</h5>
          <h5 class=" m-3 p-2 shadow fw-bolder d-flex justify-content-center">Price:<span>&#8377;</span>${product.price}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <div class="d-flex justify-content-center gap-3">
          <button class="cart fw-bold shadow " id=${product.id}>Cart</button>
          <button class="buy fw-bold bg-primary shadow">Buy</button>
          </div>
        </div>
      </div>
    `;    
  }
  


const cartItems = document.querySelectorAll('.cart');
  for (let i = 0; i < cartItems.length; i++) {
  const button = cartItems[i];
  button.addEventListener('click', () => {
  const productId = button.id;
  const cartData = JSON.parse(localStorage.getItem('cart'))||[];

    if (cart.hasOwnProperty(productId)) {
      cart[productId] += 1;  
      console.log('Already have product:',productId,cart[productId]);
    } 
    else { 
      cart[productId] = 1;
      console.log('Added product:', cart[productId]);
      button.textContent = "remove";
      button.style.color = 'red'; 

      cartData.push(products[productId]);
      localStorage.setItem('cart', JSON.stringify(cartData));

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
    displayContainer.innerHTML = `<h1>Oops we don't have ${searchInput} right now</h1>`;
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
 
//getCart();
  // cartContainer.innerHTML = `<h1>This is cart</h1>`;
  window.location.href = 'cart.html';

  
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


