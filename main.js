
document.addEventListener('DOMContentLoaded', function() {

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function(event) {
    GetCheck(event)
  });

  loginForm.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      loginForm.onsubmit()
    }
  });


});



function GetCheck(event){
  event.preventDefault();
  console.log(event);
  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  // Form the data object to be sent in the request body
  const data = {
    username,
    password
  };


  // Send the form data to the Java backend using Fetch API with a POST request
  fetch('https://9f52-93-170-222-31.ngrok-free.app/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
      .then(response => response.json())
      .then(data => {
        console.log('data = ' ,data);
        // Handle the response from the backend if needed
        if (data.token) {
          // Store the token in local storage
          localStorage.setItem('jwtToken', data.token);
          // Redirect the user to the main.html page after successful login


          fetch("https://9f52-93-170-222-31.ngrok-free.app/user/findAll", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
            }
          })
              .then((response) => response.json())
              .then((data) => {
                // Populate the table with the fetched data
                getExpired(data);
              })
              .catch((error) => {
                console.error("Error fetching data from backend:", error);
              });


          // window.location.href = 'main.html';
        } else {
          alert('Неверный пароль или логин ');

          // Handle login error if necessary
        }
      })
      .catch(error => {
        // Handle error if necessary
        alert('Неверный пароль или логин');
        document.getElementById('name').value ='';
        document.getElementById('password').value = '';
      });
}
// Add DataTable and modal code here...
