const authModal = document.getElementById('auth-modal');
const closeModalBtn = document.getElementById('close-auth-modal');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');

// const openModalTriggers = document.querySelectorAll('.login-btn');

const closeModal = () => {
    loginModal.style.display = 'none'
};

closeModalBtn.addEventListener('click', closeModal);
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        closeModal();
    }
});

showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});
const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.add('has-error');
    input.classList.add('is-invalid');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = message;
};

const clearError = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('has-error');
    input.classList.remove('is-invalid');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = '';
};

const validateForm = (form) => {
    let isValid = true;
    form.querySelectorAll('.has-error').forEach(group => group.classList.remove('has-error'));
    form.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
    const fields = form.querySelectorAll('[required]');
    fields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required.');
            isValid = false;
        } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
            showError(field, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(field);
        }
    });

    return isValid;
};

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(loginForm)) {
        window.location.href = '404page.html';
        closeModal();
        loginForm.reset();
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(signupForm)) {
        window.location.href = '404page.html';
        closeModal();
        signupForm.reset();
    }
});