const displayContainer = document.getElementById("productContainer");
const homePage = document.getElementById("cover");
const count = document.querySelector(".badge");
var filterDropdown = document.getElementById('filterDropdown');

if(sessionStorage.getItem('isLoggedIn')!=='true'){
   sessionStorage.setItem('isLoggedIn','false');
}

var products;
var users;


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

async function loadUsers() {
  try {
    const res = await fetch("users.json");
    const data = await res.json();
    users = data.users;
    console.log(users.length);
    login(users);
    
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

function login(users){
  let success = false;
  const enteredUsername = prompt('Please enter your username:');
  const enteredPassword = prompt('Please enter your password:');
  for(let i=0;i<users.length;i++)
  {
    if(users[i].username===enteredUsername && users[i].password==enteredPassword)
    {
      alert('login successful');
      sessionStorage.setItem('isLoggedIn','true');
      success = true;
      break;
    } 

  }
  if(!success)
  {
    alert('I dont know who you are');
    //login(users);
  }
}


function displayData(items) {
  displayContainer.innerHTML = ``;
  for (let i = 0; i < items.length; i++) {
    const product = items[i];
    displayContainer.innerHTML += `
      <div class="card col-md-3 p-2 cardItem " >
        <div class="card-body shadow-lg "  style=" height:50%">
          <h3 class="card-title">${product.title}</h3>
          <h5 class="card-subtitle mb-2 text-body-secondary">${product.brand}</h5>
          <img src="${product.img}" class="card-img-top" alt="..."  style="height: 30%; width:100%">
          <h5 class=" m-3 p-2 border  border-2 shadow fw-bolder d-flex justify-content-center">${product.rating} <span class="fa fa-star checked"></span></h5>
          <h5 class=" m-3 p-2 border border-red border-2 shadow fw-bolder d-flex justify-content-center" style="background-color:light${product.color}">${product.color}</h5>
          <h5 class=" m-3 p-2 shadow fw-bolder d-flex justify-content-center">
          ${product.discount ? `<span style="color:green;" class="shadow border border-1">${product.discount}% OFF</span>&nbsp;&nbsp;<s>&#8377;${product.price}</s> &nbsp;  &#8377;`+Math.floor(product.price-(product.discount*product.price)/100) : `&#8377;` +product.price}
          </h5>
          <p class="card-text mb-auto">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <div class="d-flex justify-content-center gap-3">
          <button class="cart fw-bold shadow " id=${product.id}>Cart</button>
          <button class="buy fw-bold bg-primary shadow" id=${product.id}>Buy</button>
          </div>
        </div>
      </div>
    `;

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    count.innerHTML = cartData.length;
  }

  const cartItems = document.querySelectorAll(".cart");

  for (let i = 0; i < cartItems.length; i++) {
    const button = cartItems[i];
    button.addEventListener("click", () => {
     let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  console.log(isLoggedIn);

     if(isLoggedIn === 'false')
     {
      alert('Login needed');
      loadUsers();

      
   

    //console.log(users.length);
    

// if(enteredPassword==1234 && enteredUsername==="Shivaraj"){
//   alert('Login successfully');
//   sessionStorage.setItem('isLoggedIn','true');

// }
// else{
//   alert('Who r u?')
// }
    }

     else
{
      const productId = button.id; //Indexing starts from zero
      

      const cartData = JSON.parse(localStorage.getItem("cart")) || [];

      console.log(cartData.hasOwnProperty(productId));
      const productAlreadyInCart = cartData.some(
        (product) => product.id === parseInt(productId)
      );

      if (productAlreadyInCart) {
        alert("Already entered to cart");
      } else {
        button.textContent = "Added ";
        button.style.color = "red";

        cartData.push(products[productId - 1]);
        // cartData[productId] = products[parseInt(productId) - 1];

        localStorage.setItem("cart", JSON.stringify(cartData));

        const cartCount = cartData.length;
            count.innerHTML = cartCount;
      }
    }
    });
  }

  const buyItems = document.querySelectorAll(".buy");
  for (let i = 0; i < buyItems.length; i++) {
    const button = buyItems[i];
    button.addEventListener("click", () => {
if(sessionStorage.getItem('isLoggedIn')==='false'){
loadUsers();
}
    else  
    {const productId = button.id - 1; //Indexing starts from zero
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
let amount ;
  if(!products[productId].discount)
  {
    amount = products[productId].price;
  }
  else{
    amount = Math.floor(products[productId].price-(products[productId].price*products[productId].discount)/100);
  }

    sessionStorage.setItem("cartAmount", amount);
    // location.reload();
    window.location.href = "payment.html";}
    });
  }
}

loadDataAndDisplay();

function filterProducts(searchInput) {
  let filteredProducts = [];

  for (let i = 0; i < products.length; i++) {
    if (
      products[i].title.toLowerCase().includes(searchInput.toLowerCase()) ||
      products[i].brand.toLowerCase().includes(searchInput.toLowerCase())) {
      filteredProducts.push(products[i]);
    }
  }

  if (filteredProducts.length !== 0) {
    displayData(filteredProducts);
    displayContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    displayContainer.innerHTML = `<h2 class='text-center'>No search results found</h2>`;
    displayContainer.scrollIntoView({ behavior: "smooth" });
  }
}

document.querySelector("#search").addEventListener("click", () => {
  const searchInput = document.querySelector("#searchInput").value;
  if (searchInput.trim().length === 0) alert("Kindly enter search value");
  else {
    filterProducts(searchInput);
    //homePage.style.height = "0";
    // homePage.innerHTML = displayContainer.innerHTML;
    // displayContainer.innerHTML = '';
    document.querySelector("#searchInput").value = "";
    //to make the display container empty
  }
});

filterDropdown.addEventListener('click', function (e) {
  if (e.target.classList.contains('dropdown-item')) {
    var selectedValue = e.target.getAttribute('data-value');
    sortItems(selectedValue);
    console.log('Selected Value:', selectedValue);
  }
});


function sortItems(sI) {
  let sorted = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].rating >= Number(sI)) {
      sorted.push(products[i]);
    }
  }

  if (sorted.length !== 0) {
    displayData(sorted);
    displayContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    displayContainer.innerHTML = `<h1>Out of stock</h1>`;
    displayContainer.scrollIntoView({ behavior: "smooth" });
  }
}



document.querySelector("#my_cart").addEventListener("click", () => {
  if(sessionStorage.getItem('isLoggedIn')==='true')
      window.location.href = "cart.html";
  else
    loadUsers();
});


