document.addEventListener('DOMContentLoaded', function() {

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function(event) {
    GetCheck(event);
  });

  loginForm.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      loginForm.onsubmit();
    }
  });
});

function getAccessToken() {
  return localStorage.getItem("jwtToken");
}

function GetCheck(event){
  event.preventDefault();

  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  // Form the data object to be sent in the request body
  const data = {
    username,
    password
  };



  // Send the form data to the Java backend using Fetch API with a POST request
  fetch('https://ea0e-94-158-54-235.ngrok-free.app/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
      .then(response => response.json())
      .then(data => {
        console.log('data = ', data);
        // Handle the response from the backend if needed
        if (data.token) {
          // Store the token in local storage
          localStorage.setItem('jwtToken', data.token);

          fetch("https://ea0e-94-158-54-235.ngrok-free.app/salary/list", {
            method: "GET",
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${getAccessToken()}`,
            }
          })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
        } else {
          alert('Неверный пароль или логин');
          document.getElementById('name').value ='';
          document.getElementById('password').value = '';
        }
      })
      .catch(error => {
        // Handle error if necessary
        alert('Неверный пароль или логин');
        document.getElementById('name').value ='';
        document.getElementById('password').value = '';
      });
}
