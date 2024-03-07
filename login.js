var users;
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

  document.getElementById('login').addEventListener('click',() =>
  {
  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;

    for(let i=0;i<users.length;i++)
  {
    if(users[i].username===enteredUsername && users[i].password==enteredPassword)
    {
      //alert('login successful');
      sessionStorage.setItem('isLoggedIn','true');
      success = true;
      window.location.href = 'index.html';
      break;
    } 

  }

  if(!success)
  {
   document.getElementById("error-message").style.display = "block";
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    login(users);
  }
  });

  
}

if(sessionStorage.getItem('isLoggedIn')==='false')
    loadUsers();