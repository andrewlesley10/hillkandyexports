// Reveal on Scroll Helper
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 50; /* Lowered from 150 so elements trigger earlier */

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Initial check — run twice to catch any elements just below fold
    revealOnScroll();
    setTimeout(revealOnScroll, 100);

    // Scroll listener
    window.addEventListener('scroll', () => {
        revealOnScroll();

        // Header shrink effect
        const header = document.querySelector('.site-header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Navbar Active State Update
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.main-nav li a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].className = 'active';
        } else {
            menuItem[i].classList.remove('active');
        }
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const formResponse = document.getElementById('formResponse');

            // Collect data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            formResponse.style.display = 'none';

            try {
                const response = await fetch('contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                formResponse.style.display = 'block';
                formResponse.textContent = result.message;

                if (result.success) {
                    formResponse.style.color = 'var(--primary-green)';
                    contactForm.reset();
                } else {
                    formResponse.style.color = 'var(--primary)';
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                formResponse.style.display = 'block';
                formResponse.style.color = 'var(--primary)';
                formResponse.textContent = 'Something went wrong. Please try again later.';
            } finally {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    }
});
