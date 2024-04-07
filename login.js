const users = [
    { username: 'owner', password: 'test123', access: 'owner' },
    { username: 'coworker', password: 'test123', access: 'coworker' }
];

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        LoginBtn(); // Call LoginBtn function
    });
});

function LoginBtn() {
const  username = document.getElementById('login-user').value;
 const  password = document.getElementById('login-password').value;
    console.log(username,password);

    const successMessageElement = document.getElementById('success-message');

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            username, password
        }),
        
    })
    .then((data) => {
        console.log("Registration successful:", data);
    
        // Start countdown from 5 seconds
        let countdown = 5;
        successMessageElement.textContent = `Registration successful! Redirecting in ${countdown} seconds...`;
        successMessageElement.style.display = "block";

        // Update the countdown every second
        const intervalId = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(intervalId);
                // window.location.href = "homepage.html"; // Redirect
                successMessageElement.textContent = `Registration successful! Redirecting in ${countdown} seconds...`;
            }
        }, 1000);
    })
    .catch((error) => {
        console.error("Registration failed:", error);
        // successMessageElement.textContent =
        //     "Registration failed. Please try again.";
        // successMessageElement.style.color = "red";
        // successMessageElement.style.display = "block";
    });

    // Find the user in the array
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Check if both username and password are correct
        if (user.username === username && user.password === password) {
            // Redirect based on user access
            if (user.access === 'owner') {
                window.location.href = 'owner-property.html';
            } else if (user.access === 'coworker') {
                window.location.href = 'coworker.html';
            }
        } else {
            // // Handle incorrect password here
            // errorMessage.textContent = 'Incorrect password';
            // errorMessage.style.display = 'block'; // Ensure the error message is visible
        }
    } else {
        // // Handle invalid username here
        // errorMessage.textContent = 'Invalid username';
        // errorMessage.style.display = 'block'; // Ensure the error message is visible
    }
}

// Function to go back to Homepage
function LoginBackBtn() {
    window.location.href = "homepage.html";
}
