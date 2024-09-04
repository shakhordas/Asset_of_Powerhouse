function submit() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordErrorMassage').innerHTML = 'Passwords do not match';
        document.getElementById('confirmPasswordErrorMassage').style.color = 'red';
        return;
    }

    // Validate username
    if (username === '') {
        document.getElementById('username').style.border = 'solid red';
        return;
    }

    // Validate email
    if (email === '') {
        document.getElementById('email').style.border = 'solid red';
        return;
    }

    // Validate password
    if (password === '') {
        document.getElementById('password').style.border = 'solid red';
        return;
    }

    if (confirmPassword === '') {
        document.getElementById('password').style.border = 'solid red';
        return;
    }

    if (password.length < 4) {
        document.getElementById('passwordErrorMassage').innerHTML = 'Password cannot be less than 4 characters';
        document.getElementById('passwordErrorMassage').style.color = 'red';
        return;
    }

    // Store the data in cookies
    setCookie('username', username, 7); // Store for 7 days
    setCookie('email', email, 7);
    setCookie('password', password, 7);
}

// Helper functions to set and get cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + ";../../index.html";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
