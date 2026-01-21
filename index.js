// Main JavaScript for Enhanced Portfolio

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize all components
    initLoadingScreen();
    initCustomCursor();
    initMobileMenu();
    initHeroAnimation();
    initScrollAnimations();
    initSectionReveals();
    initBackToTop();
    initFormSubmission();
    initMouseFollower();
    initParallaxEffects();
    initSkillCardsAnimation();
}

// 1. Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    }, 2000);
}

// 2. Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (window.innerWidth > 768) { // Only on desktop
        document.addEventListener('mousemove', (e) => {
            // Move cursor
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            
            // Move follower with delay
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power2.out"
            });
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card-main, .skill-card-secondary');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3
                });
                gsap.to(follower, {
                    scale: 1.5,
                    duration: 0.3,
                    backgroundColor: 'rgba(212, 255, 0, 0.1)'
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3
                });
                gsap.to(follower, {
                    scale: 1,
                    duration: 0.3,
                    backgroundColor: 'transparent'
                });
            });
        });
        
        // Click effect
        document.addEventListener('mousedown', () => {
            gsap.to(cursor, { scale: 0.8, duration: 0.1 });
            gsap.to(follower, { scale: 0.8, duration: 0.1 });
        });
        
        document.addEventListener('mouseup', () => {
            gsap.to(cursor, { scale: 1, duration: 0.1 });
            gsap.to(follower, { scale: 1, duration: 0.1 });
        });
    } else {
        // Hide custom cursor on mobile
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

// 3. Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');
    const spans = menuBtn.querySelectorAll('span');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        if (mobileMenu.classList.contains('hidden')) {
            // Close menu
            gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
            
            gsap.to(mobileMenu, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    document.body.style.overflow = 'auto';
                }
            });
        } else {
            // Open menu
            gsap.to(spans[0], { rotate: 45, y: 6, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotate: -45, y: -6, duration: 0.3 });
            
            mobileMenu.style.display = 'flex';
            gsap.fromTo(mobileMenu,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Reset hamburger icon
            gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
        });
    });
}

// 4. Hero Animation
function initHeroAnimation() {
    // Animate hero text lines
    const heroLines = document.querySelectorAll('.hero-text');
    
    heroLines.forEach((line, index) => {
        gsap.from(line, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power4.out"
        });
    });
    
    // Animate badge
    gsap.from('.inline-flex', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5
    });
    
    // Animate subheadline
    gsap.from('.max-w-2xl', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power2.out"
    });
    
    // Animate CTA buttons
    gsap.from('.cta-btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        stagger: 0.1
    });
}

// 5. Scroll Animations
function initScrollAnimations() {
    // Animate navigation on scroll
    const nav = document.querySelector('nav');
    
    ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
            if (self.direction === -1) {
                // Scrolling up
                gsap.to(nav, {
                    y: 0,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(10, 10, 10, 0.8)',
                    duration: 0.3
                });
            } else {
                // Scrolling down
                gsap.to(nav, {
                    y: -100,
                    duration: 0.3
                });
            }
        }
    });
}

// 6. Section Reveal Animations
function initSectionReveals() {
    // Animate each section on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index === 0) return; // Skip hero section
        
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
    
    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card-main, .skill-card-secondary');
    
    skillCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });
}

// 7. Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    ScrollTrigger.create({
        start: "top top",
        onUpdate: (self) => {
            if (self.progress > 0.3) {
                gsap.to(backToTopBtn, {
                    opacity: 1,
                    duration: 0.3
                });
            } else {
                gsap.to(backToTopBtn, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 1,
            ease: "power2.inOut"
        });
    });
}

// 8. Form Submission
function initFormSubmission() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('inputname').value.trim();
        const email = document.getElementById('inputemail').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Change button state
        const originalText = btnText.textContent;
        const originalIcon = btnIcon.className;
        
        btnText.textContent = 'Sending...';
        btnIcon.className = 'ri-loader-4-line animate-spin';
        submitBtn.disabled = true;
        
        // Prepare parameters
        const params = {
            name: name,
            email: email,
            message: message
        };
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                "service_p6r5j8p",
                "template_phgma9f",
                params
            );
            
            if (response.status === 200) {
                // Success
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                form.reset();
                
                // Animate success
                gsap.fromTo(submitBtn,
                    { backgroundColor: '#10B981' },
                    { 
                        backgroundColor: '#D4FF00',
                        duration: 2,
                        onComplete: () => {
                            btnText.textContent = 'Message Sent!';
                            btnIcon.className = 'ri-check-line';
                            
                            // Reset after 3 seconds
                            setTimeout(() => {
                                btnText.textContent = originalText;
                                btnIcon.className = originalIcon;
                                submitBtn.disabled = false;
                            }, 3000);
                        }
                    }
                );
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
            
            // Reset button
            btnText.textContent = originalText;
            btnIcon.className = originalIcon;
            submitBtn.disabled = false;
        }
    });
    
    // Email validation function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-6 right-6 z-[9999] px-6 py-4 rounded-lg font-sans text-sm font-medium transition-all transform translate-x-full`;
        
        if (type === 'success') {
            notification.style.backgroundColor = '#10B981';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#EF4444';
            notification.style.color = 'white';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        gsap.to(notification, {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Remove after 5 seconds
        setTimeout(() => {
            gsap.to(notification, {
                x: 500,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    notification.remove();
                }
            });
        }, 5000);
    }
}

// 9. Mouse Follower (Shery.js alternative)
function initMouseFollower() {
    // Simple mouse follower effect
    const follower = document.querySelector('.custom-cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        if (follower && window.innerWidth > 768) {
            const x = e.clientX;
            const y = e.clientY;
            
            // Update position with smooth transition
            follower.style.left = x + 'px';
            follower.style.top = y + 'px';
        }
    });
}

// 10. Parallax Effects
function initParallaxEffects() {
    // Create parallax for background elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: element.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// 11. Skill Cards Hover Animation
function initSkillCardsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card-main');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// 12. Intersection Observer for lazy loading
function initLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
}

// 13. Initialize all on window load
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Log initialization
    console.log('🎨 Portfolio initialized successfully!');
});

// Export functions for debugging
window.portfolio = {
    init: initializePortfolio,
    initLoadingScreen,
    initCustomCursor,
    initMobileMenu,
    initHeroAnimation,
    initScrollAnimations,
    initSectionReveals,
    initBackToTop,
    initFormSubmission
};