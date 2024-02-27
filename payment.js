
const cartSummaryData = JSON.parse(localStorage.getItem("cart")) || [];
const upi = document.getElementById('upi');
const online = document.getElementById('online');
const cash = document.getElementById('cash');
const pay = document.getElementById('pay');

const payAmt = localStorage.getItem('cartAmount');
pay.value=payAmt ;
pay.disabled =true;



online.addEventListener('click',()=>{
upi.style.visibility = 'visible';
});

cash.addEventListener('click',()=>{
    upi.style.visibility = 'visible';

upi.innerHTML = `<h1>Thank you Be ready with cash</h1>`;
});

