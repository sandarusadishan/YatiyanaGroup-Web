document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // -----------------------------------
    // 1. Hero Background Slider
    // -----------------------------------
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.animation = 'none'; // Reset animation
            void slides[currentSlide].offsetWidth; // Trigger reflow
            slides[currentSlide].style.animation = ''; // Re-apply animation
        };

        setInterval(nextSlide, slideInterval);
    }


    // -----------------------------------
    // 2. Hero Parallax Effect
    // -----------------------------------
    gsap.to(".hero-slider", {
        yPercent: 40, // Move it down 40% of its own height
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true // Smoothly scrubs the animation on scroll
        }
    });


    // -----------------------------------
    // 3. Header Scroll & Mobile Menu
    // -----------------------------------
    const header = document.querySelector("header");
    const toTop = document.querySelector(".to-top");
    const heroSection = document.querySelector(".hero");
    const hamburger = document.querySelector(".hamburger-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileNavClose = document.querySelector(".mobile-nav-close");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add 'scrolled' class to header after scrolling 50px
        if (scrollTop > 50) {
            header.classList.add("scrolled");
            toTop.classList.add("active");
        } else {
            header.classList.remove("scrolled");
            toTop.classList.remove("active");
        }
    });

    if (hamburger) {  
        hamburger.addEventListener("click", () => mobileNav.classList.add("active"));  
    }
    if (mobileNavClose) {  
        mobileNavClose.addEventListener("click", () => mobileNav.classList.remove("active"));  
    }
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => mobileNav.classList.remove("active"));
    });


    // -----------------------------------
    // 4. Auto-Counting Number Animation 
    // -----------------------------------
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.counter');
    let counterStarted = false;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 10);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + '+';
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                counters.forEach(counter => startCounter(counter));
                counterStarted = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {  
        observer.observe(statsSection);  
    }


    // -----------------------------------
    // 5. EmailJS Form Submission 
    // -----------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const serviceID = 'service_gamwh5i';
            const templateIDToCompany = 'template_srzk65p'; 
            const templateIDToCustomer = 'template_r0mj5x6';
            const publicKey = 'D84ebfog3xQ0S44I8';
            
            const form = this;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerText;
            submitButton.disabled = true;
            submitButton.innerText = 'Sending...';

            const templateParams = {
                from_name: form.querySelector('#from_name').value,
                from_email: form.querySelector('#from_email').value,
                from_phone: form.querySelector('#from_phone').value,
                message: form.querySelector('#message').value
            };

            emailjs.init(publicKey);
            
            emailjs.send(serviceID, templateIDToCompany, templateParams)
                .then(() => emailjs.send(serviceID, templateIDToCustomer, templateParams))
                .then(() => {
                    alert('Message sent successfully! A confirmation email has been sent to you.');
                    submitButton.disabled = false;
                    submitButton.innerText = originalButtonText;
                    form.reset(); 
                })
                .catch((err) => {
                    console.error('EmailJS Error:', err);
                    alert('Failed to send message. Please try again.');
                    submitButton.disabled = false;
                    submitButton.innerText = originalButtonText;
                });
        });
    }

    // -----------------------------------
    // 6. Seamless Customer Logo Slider
    // -----------------------------------
    const logoSlider = document.querySelector('.logo-slider');
    if (logoSlider) {
        const logoTrack = logoSlider.querySelector('.logo-track');
        if (logoTrack) {
            const slides = Array.from(logoTrack.children);
            // Duplicate slides to create a seamless loop
            slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                clone.setAttribute('aria-hidden', true);
                logoTrack.appendChild(clone);
            });
        }
    }

    // -----------------------------------
    // 7. Mouse-Following Glow Effect
    // -----------------------------------
    const glowSections = document.querySelectorAll('.glow-section');
    glowSections.forEach(section => {
        const glowCircle = section.querySelector('.radial-glow-circle');
        if (glowCircle) {
            section.addEventListener('mousemove', (e) => {
                // Get position relative to the section
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                glowCircle.style.left = `${x}px`;
                glowCircle.style.top = `${y}px`;
            });
        }
    });

    // -----------------------------------
    // 8. Interactive Lightbox Gallery
    // -----------------------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const imageUrl = item.getAttribute('href');
            lightboxImage.setAttribute('src', imageUrl);
            lightbox.classList.add('active');
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightboxImage.setAttribute('src', ''); // Clear image to save memory
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); }); // Close on overlay click


    // -----------------------------------
    // 10. Interactive Glow on "Why Us" Cards
    // -----------------------------------
    const whyUsCards = document.querySelectorAll('.why-us-card');
    whyUsCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // -----------------------------------
    // 11. GSAP Scroll-Triggered Animations
    // -----------------------------------
    // Remove AOS attributes as GSAP is now handling animations
    document.querySelectorAll('[data-aos]').forEach(el => el.removeAttribute('data-aos'));

    const animateUp = (element) => {
        gsap.fromTo(element, 
            { autoAlpha: 0, y: 50 }, 
            { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
        );
    };

    // Animate sections and elements
    animateUp('.section-title, .section-desc, .section-title-sub');
    animateUp('.about .left-side, .about .right-side');
    animateUp('.overview-grid .overview-card');
    animateUp('.why-us-grid .why-us-card');
    animateUp('.product-categories .product-category-card');
    animateUp('.gallery-grid .gallery-item');
    animateUp('.process-grid .process-step');
    animateUp('.leader-card-wrapper');
    animateUp('.logo-slider');
    animateUp('footer .profile, footer .link-container');

    // --- Special Animations ---

    // 1. Hero text on page load
    gsap.from('.hero .title, .hero .subtitle, .hero .btn-primary', {
        duration: 1.2, y: 50, autoAlpha: 0, stagger: 0.2, ease: 'expo.out', delay: 0.2
    });

    // 2. Contact form fields
    gsap.from("#contact-form .form-group", {
        scrollTrigger: { trigger: "#contact-form", start: "top 80%" },
        duration: 0.8, y: 30, autoAlpha: 0, stagger: 0.15, ease: 'power2.out'
    });

    // 3. Map container animation
    gsap.from(".map-container", {
        scrollTrigger: { trigger: ".map-container", start: "top 85%", toggleActions: 'play none none none' },
        duration: 1, autoAlpha: 0, y: 50, scale: 0.95, ease: 'power3.out'
    });

    // 3. WhatsApp Icon
    const whatsappIcon = document.querySelector('.whatsapp-icon');
    gsap.fromTo(whatsappIcon, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.5, delay: 2, ease: 'back.out(1.7)' });
    gsap.to(whatsappIcon, { rotation: -15, duration: 0.1, repeat: 3, yoyo: true, delay: 3, repeatDelay: 0.1 }); // Shake animation

});