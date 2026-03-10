document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Input fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const age = document.getElementById('age');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    
    // Error elements
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const ageError = document.getElementById('ageError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');
    const ageWarning = document.getElementById('ageWarning');
    
    // Password strength
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Real-time validation
    firstName.addEventListener('input', validateFirstName);
    lastName.addEventListener('input', validateLastName);
    age.addEventListener('input', validateAge);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);
    terms.addEventListener('change', validateTerms);
    
    // Password strength checker
    password.addEventListener('input', checkPasswordStrength);
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        togglePasswordVisibility(password, this);
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(confirmPassword, this);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isAgeValid = validateAge();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();
        
        if (isFirstNameValid && isLastNameValid && isAgeValid && 
            isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
            
            // Check age restriction
            if (parseInt(age.value) < 18) {
                showFormMessage('error', 'You must be 18 years or older to create an account.');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            
            // Simulate API call
            setTimeout(() => {
                // In real app, you would send data to server here
                console.log('Form data:', {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    age: age.value,
                    email: email.value,
                    password: password.value
                });
                
                showFormMessage('success', 'Account created successfully! Redirecting...');
                
                // Redirect to home page after success
                setTimeout(() => {
                    window.location.href = 'film2.html';
                }, 2000);
                
            }, 1500);
        } else {
            showFormMessage('error', 'Please fix the errors in the form.');
        }
    });
    
    // Validation functions
    function validateFirstName() {
        const value = firstName.value.trim();
        if (!value) {
            showError(firstNameError, 'First name is required');
            return false;
        }
        if (value.length < 2) {
            showError(firstNameError, 'First name must be at least 2 characters');
            return false;
        }
        hideError(firstNameError);
        return true;
    }
    
    function validateLastName() {
        const value = lastName.value.trim();
        if (!value) {
            showError(lastNameError, 'Last name is required');
            return false;
        }
        if (value.length < 2) {
            showError(lastNameError, 'Last name must be at least 2 characters');
            return false;
        }
        hideError(lastNameError);
        return true;
    }
    
    function validateAge() {
        const value = parseInt(age.value);
        if (!age.value) {
            showError(ageError, 'Age is required');
            ageWarning.classList.remove('show');
            return false;
        }
        if (isNaN(value) || value < 1 || value > 120) {
            showError(ageError, 'Please enter a valid age (1-120)');
            ageWarning.classList.remove('show');
            return false;
        }
        
        // Check age restriction
        if (value < 18) {
            showError(ageError, 'You must be 18 or older');
            ageWarning.classList.add('show');
            return false;
        }
        
        hideError(ageError);
        ageWarning.classList.remove('show');
        return true;
    }
    
    function validateEmail() {
        const value = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showError(emailError, 'Email is required');
            return false;
        }
        if (!emailRegex.test(value)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        hideError(emailError);
        return true;
    }
    
    function validatePassword() {
        const value = password.value;
        if (!value) {
            showError(passwordError, 'Password is required');
            return false;
        }
        if (value.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters');
            return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showError(passwordError, 'Password must contain uppercase, lowercase, and numbers');
            return false;
        }
        hideError(passwordError);
        return true;
    }
    
    function validateConfirmPassword() {
        const value = confirmPassword.value;
        if (!value) {
            showError(confirmPasswordError, 'Please confirm your password');
            return false;
        }
        if (value !== password.value) {
            showError(confirmPasswordError, 'Passwords do not match');
            return false;
        }
        hideError(confirmPasswordError);
        return true;
    }
    
    function validateTerms() {
        if (!terms.checked) {
            showError(termsError, 'You must agree to the terms and conditions');
            return false;
        }
        hideError(termsError);
        return true;
    }
    
    // Password strength checker
    function checkPasswordStrength() {
        const value = password.value;
        let strength = 0;
        let text = 'Password strength';
        let color = '#ff4757';
        
        if (value.length >= 8) strength += 25;
        if (/[a-z]/.test(value)) strength += 25;
        if (/[A-Z]/.test(value)) strength += 25;
        if (/\d/.test(value)) strength += 25;
        
        strengthBar.style.width = strength + '%';
        
        if (strength === 0) {
            text = 'Very Weak';
            color = '#ff4757';
        } else if (strength <= 25) {
            text = 'Weak';
            color = '#ff4757';
        } else if (strength <= 50) {
            text = 'Fair';
            color = '#ffa502';
        } else if (strength <= 75) {
            text = 'Good';
            color = '#2ed573';
        } else {
            text = 'Strong';
            color = '#2ed573';
        }
        
        strengthBar.style.background = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }
    
    // Helper functions
    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }
    
    function hideError(element) {
        element.textContent = '';
        element.classList.remove('show');
    }
    
    function togglePasswordVisibility(inputField, button) {
        const type = inputField.type === 'password' ? 'text' : 'password';
        inputField.type = type;
        button.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    }
    
    function showFormMessage(type, message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
    
    // Back to home button functionality
    document.querySelector('.back-home').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'cineverse4.html';
    });
    
    // Sign in link functionality
    document.querySelector('.login-link .link').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign In page would open here');
        // In a real app, you might redirect to a separate sign-in page
    });
});