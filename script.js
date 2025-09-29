document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".menu-items").classList.toggle("show");
});
document.querySelector(".btn-close").addEventListener("click", function () {
    document.querySelector(".menu-items").classList.remove("show");
});




document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginContainer = document.getElementById('loginContainer');

    loginBtn.addEventListener('click', () => {
        if (!document.getElementById('loginCss')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'login.css';
            link.id = 'loginCss';
            document.head.appendChild(link);
        }

        fetch('login.html')
            .then(res => res.text())
            .then(data => {
                loginContainer.innerHTML = data; // HTML inserted
                loginModal.style.display = 'flex';
                attachFormJS();
            });
    });


    closeLoginModal.addEventListener('click', () => loginModal.style.display = 'none');
    window.addEventListener('click', e => { if (e.target === loginModal) loginModal.style.display = 'none'; });


    function attachFormJS() {
        // DOM Elements
        const loginTab = document.getElementById('login-tab');
        const signupTab = document.getElementById('signup-tab');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const goToSignup = document.getElementById('go-to-signup');
        const goToLogin = document.getElementById('go-to-login');

        // Password toggle elements
        const loginPasswordToggle = document.getElementById('login-password-toggle');
        const loginPasswordInput = document.getElementById('login-password');
        const signupPasswordToggle = document.getElementById('signup-password-toggle');
        const signupPasswordInput = document.getElementById('signup-password');

        // Switch between login and signup forms
        loginTab.addEventListener('click', function () {
            switchToLogin();
        });

        signupTab.addEventListener('click', function () {
            switchToSignup();
        });

        goToSignup.addEventListener('click', function (e) {
            e.preventDefault();
            switchToSignup();
        });

        goToLogin.addEventListener('click', function (e) {
            e.preventDefault();
            switchToLogin();
        });

        function switchToLogin() {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        }

        function switchToSignup() {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        }

        // Toggle password visibility
        loginPasswordToggle.addEventListener('click', function () {
            togglePasswordVisibility(loginPasswordInput, loginPasswordToggle);
        });

        signupPasswordToggle.addEventListener('click', function () {
            togglePasswordVisibility(signupPasswordInput, signupPasswordToggle);
        });

        function togglePasswordVisibility(input, toggle) {
            if (input.type === 'password') {
                input.type = 'text';
                toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                toggle.innerHTML = '<i class="fas fa-eye"></i>';
            }
        }

        // Form validation
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateLoginForm()) {
                // Simulate successful login
                alert('Login successful! Redirecting to your dashboard...');
                loginForm.reset();
            }
        });

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateSignupForm()) {
                // Simulate successful signup
                alert('Account created successfully! Welcome to FundraiseHub.');
                signupForm.reset();
                switchToLogin();
            }
        });

        function validateLoginForm() {
            let isValid = true;
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            // Validate email
            if (!email) {
                showError('login-email-error', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('login-email-error', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError('login-email-error');
            }

            // Validate password
            if (!password) {
                showError('login-password-error', 'Password is required');
                isValid = false;
            } else {
                hideError('login-password-error');
            }

            return isValid;
        }

        function validateSignupForm() {
            let isValid = true;
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            // Validate name
            if (!name) {
                showError('signup-name-error', 'Full name is required');
                isValid = false;
            } else {
                hideError('signup-name-error');
            }

            // Validate email
            if (!email) {
                showError('signup-email-error', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('signup-email-error', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError('signup-email-error');
            }

            // Validate password
            if (!password) {
                showError('signup-password-error', 'Password is required');
                isValid = false;
            } else if (password.length < 8) {
                showError('signup-password-error', 'Password must be at least 8 characters');
                isValid = false;
            } else {
                hideError('signup-password-error');
            }

            // Validate confirm password
            if (!confirmPassword) {
                showError('signup-confirm-password-error', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError('signup-confirm-password-error', 'Passwords do not match');
                isValid = false;
            } else {
                hideError('signup-confirm-password-error');
            }

            return isValid;
        }

        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function hideError(elementId) {
            const errorElement = document.getElementById(elementId);
            errorElement.style.display = 'none';
        }

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (this.id === 'login-email' || this.id === 'login-password') {
                    validateLoginForm();
                } else {
                    validateSignupForm();
                }
            });
        });
    }
});