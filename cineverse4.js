
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            
            answer.classList.toggle('active');
            
            
            if (answer.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
            
            
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherAnswer.classList.remove('active');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
        });
    });
    
    
    const languageSelectors = document.querySelectorAll('.language-selector');
    languageSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            
            console.log('Language changed to:', this.value);
        });
    });
    
    
    const signInBtn = document.querySelector('.sign-in-btn');
    signInBtn.addEventListener('click', function() {
    
       window.location.href = 'cineverse_login.html';

  
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const emailInput = this.closest('.input-group').querySelector('.email-input');
            if (emailInput.value) {
                alert('Thank you! You will be redirected to sign up.');
            } else {
                emailInput.focus();
                emailInput.style.borderColor = '#ff0000';
            }
        });
    });
    
    
    const emailInputs = document.querySelectorAll('.email-input');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#ABE0F0';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#ABE0F0';
            }
        });
    });
});})