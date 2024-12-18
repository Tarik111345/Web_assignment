//Theme toggle
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('coffee-theme');
    document.body.classList.toggle('dark-blue-theme');
});

//Interactive gallery
document.querySelectorAll('.menu-item img').forEach(item => {
    item.addEventListener('click', event => {
        const imageSrc = event.target.src; 
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSrc; 
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show(); 
    });
});

//content toggle
const contentToggleButton = document.getElementById("content-toggle");
const details = document.getElementById("details");

contentToggleButton.addEventListener("click", () => {
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
});

//Accordion Menu
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
        const content = button.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

//Advanced Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrengthMeter = document.getElementById('password-strength');
    const form = document.getElementById('contact-form');

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++; 
        if (/[A-Z]/.test(password)) strength++; 
        if (/[0-9]/.test(password)) strength++; 
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; 

        if (strength === 0) {
            passwordStrengthMeter.className = 'weak';
        } else if (strength === 1) {
            passwordStrengthMeter.className = 'weak';
        } else if (strength === 2) {
            passwordStrengthMeter.className = 'medium';
        } else {
            passwordStrengthMeter.className = 'strong';
        }
    }

    passwordInput.addEventListener('input', function () {
        checkPasswordStrength(passwordInput.value);
    });

    form.addEventListener('submit', function (e) {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            nameError.style.display = 'inline';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        if (!emailInput.value.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
            emailError.style.display = 'inline';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        if (!dobInput.value) {
            dobError.style.display = 'inline';
            isValid = false;
        } else {
            dobError.style.display = 'none';
        }

        if (passwordInput.value.trim() === '') {
            passwordError.style.display = 'inline';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.style.display = 'inline';
            isValid = false;
        } else {
            confirmPasswordError.style.display = 'none';
        }

        if (!isValid) {
            e.preventDefault(); 
        }
    });
});


