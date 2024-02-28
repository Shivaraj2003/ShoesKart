
const cartSummaryData = JSON.parse(localStorage.getItem("cart")) || [];
const upi = document.getElementById('upi');
const online = document.getElementById('online');
const cash = document.getElementById('cash');
const pay = document.getElementById('pay');
const temp = upi.innerHTML;
const payAmt = localStorage.getItem('cartAmount');

pay.innerHTML=`&#8377;${payAmt}` ;
pay.disabled =true;



online.addEventListener('click',()=>{
    upi.innerHTML=temp;
upi.style.visibility = 'visible';
});

cash.addEventListener('click',()=>{
    upi.style.visibility = 'visible';

upi.innerHTML = `<h1>Thank you Be ready with cash</h1>`;
});

