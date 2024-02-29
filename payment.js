
const cartSummaryData = JSON.parse(localStorage.getItem("cart")) || [];
const upi = document.getElementById('upi');
const online = document.getElementById('online');
const cash = document.getElementById('cash');
const pay = document.getElementById('pay');
const temp = upi.innerHTML;
const payAmt = sessionStorage.getItem('cartAmount');
const payment = document.getElementsByClassName('payment');
const count = document.querySelector(".badge");

pay.innerHTML = `&#8377;${payAmt}`;
pay.disabled = true;

let done = false;

online.addEventListener('click', () => {
    upi.innerHTML = temp;
    upi.style.display = 'flex';
    done = true;
});

cash.addEventListener('click', () => {
    upi.style.display = 'flex';
    upi.style.visibility = 'visible';
    upi.innerHTML = `<h3>Thank you Be ready with cash</h3>`;
    done = true;

});

document.getElementById('checkBtn').onclick = (event) => {
    let fName = document.getElementById('firstName');
    let lName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let tel = document.getElementById('phoneNumber');
    let add = document.getElementById('address');
    let zip = document.getElementById('zip');
    let name = document.getElementById('cc-name');
    let cardNum = document.getElementById('cc-number');
    let expiry = document.getElementById('cc-expiration');
    let cvv = document.getElementById('cc-cvv');


    if (document.getElementById('online').checked) {
        if (name.value.trim() == '' || cardNum.value.trim() == '' || expiry.value.trim() == '' || cvv.value.trim() == '') {
            event.preventDefault();
            upi.style.color = 'red';
            console.log('Enter card data');
        }
    }

    if (fName.value.trim() === '') {
        fName.value = "First Name cannot be empty";
        fName.style.color = 'red';
        reset(fName);
        event.preventDefault();
    }

    if (lName.value.trim() === '') {
        lName.value = "Last Name cannot be empty";
        lName.style.color = 'red';
        reset(lName);
        event.preventDefault();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

    if (!emailRegex.test(email.value.trim())) {
        email.value = "Invalid email format";
        email.style.color = 'red';
        reset(email);
        event.preventDefault();
    }

    const phoneRegex = /^[1-9]\d{9}$/;
    if (phoneRegex.test(tel.value.trim()) == false) {
        tel.style.color = 'red';
        reset(tel);
        event.preventDefault();
    }

    if (add.value.trim() === '') {
        add.value = "Address cannot be empty";
        add.style.color = 'red';
        reset(add);
        event.preventDefault();
    }

    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(zip.value.trim())) {
        zip.value = "Invalid zip code";
        zip.style.color = 'red';
        reset(zip);
        event.preventDefault();
    }
    if (done == false) {
        console.log("Choose payment method");
        event.preventDefault();
    }

    function reset(val) {
        val.onclick = () => {
            val.style.color = 'black';
            val.value = '';
        }

    }
}


document.querySelector("#my_cart").addEventListener("click", () => {
  window.location.href = "cart.html";
});

const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    count.innerHTML = cartData.length;