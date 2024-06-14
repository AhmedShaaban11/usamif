const loginBtn = document.getElementById('login-btn');
const signUpBtn = document.getElementById('signup-btn');
const loginBox = document.getElementById('login-box');
const signUpBox = document.getElementById('signup-box');

loginBtn.addEventListener('click', () => {
    loginBox.style.display = 'block';
    signUpBox.style.display = 'none';
});

signUpBtn.addEventListener('click', () => {
    loginBox.style.display = 'none';
    signUpBox.style.display = 'block';
});
