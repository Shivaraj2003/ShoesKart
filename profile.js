let username = document.getElementById('username');
let job = document.getElementById('job');
let email = document.getElementById('email');
let phNo = document.getElementById('phNo');


var id = sessionStorage.getItem("id");
id=Number(id);

console.log(id);
var users;
async function loadUsers() {
  try {
    const res = await fetch("users.json");
    const data = await res.json();
    users = data.users;
    username.innerText = users[id-1].name;
    job.innerText = users[id-1].country;
    email.innerText = users[id-1].email;
    phNo.innerText = users[id-1].phNo;

  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}


if(sessionStorage.getItem('isLoggedIn')==='true')
        loadUsers();



document.getElementById('logout').addEventListener('click',()=>
{
    if(sessionStorage.getItem('isLoggedIn')==='true')
    {
        sessionStorage.setItem('isLoggedIn','false');
        window.location.href = 'index.html';
    }
})







document.getElementById('cart').addEventListener('click',()=>
{
          window.location.href ='cart.html';

})