document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('registrationModal');
    const registerBtn = document.getElementById('registerBtn');
    const closeBtn = document.querySelector('.close');
    const registrationForm = document.getElementById('registrationForm');
    const formMessage = document.getElementById('formMessage');

    // Open modal
    registerBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.style.animation = 'fadeIn 0.3s';
    });

    // Close modal with X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        clearFormMessage();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            clearFormMessage();
        }
    });

    // Clear form message
    function clearFormMessage() {
        formMessage.innerHTML = '';
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
    }

    // Show message
    function showMessage(message, type) {
        formMessage.innerHTML = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Validate email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Validate phone (10 digits)
    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const college = document.getElementById('college').value.trim();
        const registeringFor = document.getElementById('registeringFor').value;

        // Validation
        if (!name || !email || !phone || !college || !registeringFor) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (!isValidPhone(phone)) {
            showMessage('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        // Get selected events
        const selectedEvents = [];
        document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked').forEach(cb => {
            selectedEvents.push(cb.value);
        });

        // Calculate amount
        let amount = 0;
        if (registeringFor === 'workshop') amount = 250;
        else if (registeringFor === 'events') amount = 200;
        else if (registeringFor === 'both') amount = 450;

        // Prepare registration data
        const registrationData = {
            name: name,
            email: email,
            phone: phone,
            college: college,
            type: registeringFor,
            events: selectedEvents,
            amount: amount,
            timestamp: new Date().toLocaleString()
        };

        // Log to console (for demo)
        console.log('Registration Data:', registrationData);

        // Show success message
        showMessage(
            `✅ Registration successful! Thank you ${name} for registering for EVOLIX'26. 
            Total amount: ₹${amount}. Payment at venue. Check your email for confirmation.`, 
            'success'
        );

        // Clear form
        registrationForm.reset();

        // Close modal after 3 seconds
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            clearFormMessage();
        }, 3000);
    });

    // Add particle effect
    function createParticles() {
        const particles = document.querySelector('.particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            particles.appendChild(particle);
        }
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    createParticles();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover sound effect (optional, can be removed if not needed)
    const buttons = document.querySelectorAll('button, .register-btn, .contact-item');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
