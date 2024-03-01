var cartContainer = document.querySelector('#cartContainer');
var totalPriceSpan = document.getElementById('totalPrice');
let totalPrice = 0;
cartContainer.innerHTML = '';
let cartData = JSON.parse(localStorage.getItem('cart')) || [];

// console.log(typeof cartData);
function remove(j) {
  const newCartData = cartData.filter((object) => {
    return object.id !== j;
  });
  localStorage.setItem('cart', JSON.stringify(newCartData));
   location.reload();
}

if (cartData.length === 0) {
  cartContainer.innerHTML = `<h3 class="p-3 m-3 fw-bold fs-7 text-center">Not added any items to cart</h3>
      <div class="text-center">
        <a href="index.html"><button type="button" class="btn btn-primary mb-3 fw-bold">Go to Home Page</button></a>
      </div>`;

  document.querySelector('#pricing').innerHTML = '';
} else {
  cartContainer.innerHTML = `<div class="card-body fw-bold p-4 border border-2 border-black" id="productRow">
    <div class="row d-flex justify-content-between align-items-center bg-light">
    <div class="col-md-5 col-lg-5 col-xl-5 text-center">Product Details</div>
    <div class="col-md-2 col-lg-2 col-xl-2 text-center">Quantity</div>
    <div class="col-md-2 col-lg-2 col-xl-2 text-center">Price</div>
    <div class="col-md-2 col-lg-2 col-xl-2 text-center">Total Price</div>
    <div class="col-md-1 col-lg-1 col-xl-1 text-center"></div>
  </div>
  </div>`;
  for (let i = 0; i < cartData.length; i++) {
    cartContainer.innerHTML += `<div class="card-body p-4 mb-4 border border-2 border-black " >
        <div class="row d-flex justify-content-center align-items-center">
        
          <div class="col-md-5 col-lg-5 col-xl-5 text-center">
            <img src=${cartData[i].img} class="card-img-top" alt="Shoez" style="height: 100px; width:150px"/>
            
          

          
            <p class="lead fw-normal fw-bold mb-2">${cartData[i].title}</p>
            <span>
              <span ">Size:${cartData[i].size}</span>
              <br>
              <span class="fw-bold">${cartData[i].color}</span>
            </span>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mb-2 d-flex text-center" id="units">
            <button class="btn btn-link px-2" id="decrement" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
              <i class="fas fa-minus"></i>
            </button>

            <input id="form1${i}" min="1"  value="1" type="number" class="form-control form-control-sm text-center" />

            <button id = "increment" class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
              <i class="fas fa-plus"></i>
            </button>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 text-center" id='mg'>
            <span id='media1' class="fw-bold">Unit Price: </span>
            <h5 class="mb-0">&#8377;${cartData[i].price}</h5>
          </div>

           <div class="col-md-2 col-lg-2 col-xl-2 text-center">
           <span id='media1' class="fw-bold">Total Price: </span>
            <h5 class= 'm-0'>&#8377;<span id = 'total${i}' >${cartData[i].price}</span></h5>
          </div>

          <div id="removeButton${i}" class="col-md-1 col-lg-1 col-xl-1 text-end remove")">
            <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
          </div>
        </div>
      </div>`;

    update(i);

    totalPrice += cartData[i].price;
  }

  totalPriceSpan.innerText = totalPrice;
  sessionStorage.setItem('cartAmount', totalPrice);
}

const removeButton = document.querySelectorAll(`.remove`);

for (let i = 0; i < cartData.length; i++) {
  const btnRemove = removeButton[i];
  btnRemove.addEventListener('click', () => {
    remove(cartData[i].id);
  });
}

function update(i) {
  const increment = document.querySelectorAll('#increment');

  const decrement = document.querySelectorAll('#decrement');

  let totalPrice = 0;

  for (let i = 0; i < decrement.length; i++) {
    const button1 = decrement[i];
    const button2 = increment[i];
    button1.addEventListener('click', () => {
      console.log('clicked');
      const val = document.getElementById(`form1${i}`).value;
      console.log(typeof Number(val));
      //document.getElementById(`total${i}`).innerText = document.getElementById('media1').innerText;
      document.getElementById(`total${i}`).innerText = cartData[i].price * Number(val);
      updateTotal();
    });

    button2.addEventListener('click', () => {
      // console.log('clicked');
      const val = document.getElementById(`form1${i}`).value;
      console.log(typeof Number(val));
      document.getElementById(`total${i}`).innerText = cartData[i].price * Number(val);
      updateTotal();
    });
  }
}

function updateTotal() {
  cartData = JSON.parse(localStorage.getItem('cart')) || [];
  var amt = 0;

  for (let j = 0; j < cartData.length; j++) {
    let temp = Number(document.getElementById(`total${j}`).innerText);
    console.log(typeof temp);
    amt += temp;
    console.log(document.getElementById(`total${j}`).innerText);
  }

  totalPriceSpan.innerText = amt;
  sessionStorage.setItem('cartAmount', amt);
}
