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
        if (name.value.trim() === '' || cardNum.value.trim() === '' || expiry.value.trim() === '' || cvv.value.trim() === '') {
            event.preventDefault();
            displayError(name, 'Name on card is required');
            displayError(cardNum, 'Credit card number is required');
            displayError(expiry, 'Expiration date is required');
            displayError(cvv, 'Security code is required');
        }
    }

    if (fName.value.trim() === '') {
        displayError(fName, 'First Name cannot be empty');
        event.preventDefault();
    }

    if (lName.value.trim() === '') {
        displayError(lName, 'Last Name cannot be empty');
        event.preventDefault();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        displayError(email, 'Invalid email format');
        event.preventDefault();
    }

    const phoneRegex = /^[1-9]\d{9}$/;
    if (!phoneRegex.test(tel.value.trim())) {
        displayError(tel, 'Please enter a valid phone number');
        event.preventDefault();
    }

    if (add.value.trim() === '') {
        displayError(add, 'Address cannot be empty');
        event.preventDefault();
    }

    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(zip.value.trim())) {
        displayError(zip, 'Invalid zip code');
        event.preventDefault();
    }

    if (!done) {
        displayError(upi, 'Choose payment method');
        event.preventDefault();
    }

    function displayError(element, message) {
        element.classList.add('is-invalid');
        let errorFeedback = element.nextElementSibling;
        errorFeedback.innerHTML = message;
    }
}

document.querySelector("#my_cart").addEventListener("click", () => {
    window.location.href = "cart.html";
});

const cartData = JSON.parse(localStorage.getItem("cart")) || [];
count.innerHTML = cartData.length;
