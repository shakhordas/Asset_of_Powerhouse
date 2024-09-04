// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for(let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

// Login submission function
function submit() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email input
    if (email === '') {
        document.getElementById('email').style.border = 'solid red';
        return;
    } else {
        document.getElementById('email').style.border = '';
    }

    // Validate password input
    if (password === '') {
        document.getElementById('password').style.border = 'solid red';
        return;
    } else {
        document.getElementById('password').style.border = '';
    }

    // Retrieve stored email and password from cookies
    const cookieEmail = getCookie('email');
    const cookiePassword = getCookie('password');

    // Validate email and password
    if (email !== cookieEmail) {
        alert('Email is wrong');
    } else if (password !== cookiePassword) {
        alert('Password is wrong');
    } else {
        // Set login status in cookies
        setCookie('Login', true, 7); // Set a "Login" cookie for 7 days
        window.location.href = '../../dashboard.html';
    }
}