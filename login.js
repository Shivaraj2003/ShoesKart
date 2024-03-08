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

function login(users) {
  let success = false, fail = false;
  console.log('called');
  document.getElementById('login').addEventListener('click', () => {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    // if (enteredPassword.trim() == '' && enteredUsername.trim() == '') {
    //   document.getElementById("error-username").textContent = "Username cannot be empty";
    //   document.getElementById("error-username").style.display = "block";
    //   document.getElementById("error-message").style.display = "none";

    //   document.getElementById("error-password").textContent = "Password cannot be empty";
    //   document.getElementById("error-password").style.display = "block";
    //   fail = true;
    //   login(users);
    // }

    // else if (enteredUsername.trim() == '') {
    //   document.getElementById("error-username").textContent = "Username cannot be empty";
    //   document.getElementById("error-password").style.display = "none";
    //   document.getElementById("error-message").style.display = "none";
    //   document.getElementById("error-username").style.display = "block";
    //   document.getElementById('username').value = '';
    //   document.getElementById('password').value = '';
    //   fail = true;
    //   login(users);
    // }
    // else if (enteredPassword.trim() == '') {
    //   document.getElementById("error-username").style.display = "none";
    //   document.getElementById("error-password").textContent = "Password cannot be empty";
    //   document.getElementById("error-message").style.display = "none";

    //   document.getElementById("error-password").style.display = "block";
    //   document.getElementById('username').value = '';
    //   document.getElementById('password').value = '';
    //   fail = true;
    //   login(users);
    // }

    // else 
    {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === enteredUsername && users[i].password == enteredPassword) {
          //alert('login successful');
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('id',users[i].id);
          success = true;
          window.location.href = 'index.html';
          break;
        }

      }
    }


    if (!success) {
      console.log('login failed')
      // document.getElementById("error-username").style.display = "none";
      // document.getElementById("error-password").style.display = "none";

      document.getElementById('error-message').textContent = 'Invalid Credentials. Please check your username and password.';
      document.getElementById("error-message").style.display = "block";
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      //location.reload();
      login(users);
    }
  });


}

if (sessionStorage.getItem('isLoggedIn') === 'false')
  loadUsers();