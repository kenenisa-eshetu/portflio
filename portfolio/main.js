

console.log('====================================================');
console.log('Kenenisa\'s Portfolio - JavaScript Features Active');

// 1. SMOOTH SCROLL NAVIGATION


/**
 * Smooth scroll to sections when clicking navigation links
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                console.log(`✓ Scrolling to ${targetId}`);
            }
        });
    });
}

// ============================================================
// 2. ACTIVE NAVIGATION HIGHLIGHTING
// ============================================================

/**
 * Highlight the active navigation link based on scroll position
 */
function setupActiveNavHighlighting() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add CSS for active link if not present
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
    
    function updateActiveLink() {
        let currentSection = '';
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call
    updateActiveLink();
    
    console.log('✓ Active navigation highlighting enabled');
}

// ============================================================
// 3. SCROLL-TO-TOP BUTTON
// ============================================================

/**
 * Show/hide scroll-to-top button based on scroll position
 */
function setupScrollToTopButton() {
    // Create the button if it doesn't exist
    let scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '↑ Top';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);
        
        // Add styles for the button
        const style = document.createElement('style');
        style.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 3rem;
                height: 3rem;
                background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
                color: white;
                border: none;
                border-radius: var(--radius-lg);
                font-weight: 600;
                cursor: pointer;
                display: none;
                z-index: 99;
                transition: all var(--transition-base);
                box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
                font-size: 1.25rem;
                align-items: center;
                justify-content: center;
                opacity: 0;
            }
            
            .scroll-top-btn.show {
                display: flex;
                opacity: 1;
            }
            
            .scroll-top-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 35px rgba(37, 99, 235, 0.4);
            }
            
            .scroll-top-btn:active {
                transform: translateY(-1px);
            }
            
            @media (max-width: 768px) {
                .scroll-top-btn {
                    width: 2.5rem;
                    height: 2.5rem;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    font-size: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show/hide button based on scroll
    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log('✓ Scrolling to top');
    });
    
    window.addEventListener('scroll', toggleScrollButton);
    
    console.log('✓ Scroll-to-top button enabled');
}

// ============================================================
// 4. FORM VALIDATION & SUBMISSION
// ============================================================

/**
 * Validate contact form and show notifications
 */
function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (!form) {
        console.log('⚠ Contact form not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const subject = document.querySelector('#subject').value.trim();
        const message = document.querySelector('#message').value.trim();
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            console.log('✗ Form validation failed');
            return;
        }
        
        // Show success message
        showNotification('✓ Message sent successfully!', 'success');
        console.log('✓ Form submitted successfully');
        console.log(`  Name: ${name}`);
        console.log(`  Email: ${email}`);
        console.log(`  Subject: ${subject}`);
        
        // Clear form
        form.reset();
        
        // Optional: You can add code here to send the form data to a server
        // Example: sendFormToServer(name, email, subject, message);
    });
}

/**
 * Validate form fields
 */
function validateForm(name, email, subject, message) {
    // Check if all fields are filled
    if (!name || !email || !subject || !message) {
        showNotification('❌ Please fill in all fields!', 'error');
        console.log('✗ Validation failed: Empty fields');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('❌ Please enter a valid email address!', 'error');
        console.log('✗ Validation failed: Invalid email');
        return false;
    }
    
    // Validate name (at least 2 characters)
    if (name.length < 2) {
        showNotification('❌ Name must be at least 2 characters long!', 'error');
        console.log('✗ Validation failed: Name too short');
        return false;
    }
    
    // All validations passed
    return true;
}

// ============================================================
// 5. NOTIFICATION SYSTEM
// ============================================================

/**
 * Show notification messages (error/success)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles if not already present
    if (!document.querySelector('style[data-notification-style]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification-style', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                padding: 1rem 1.5rem;
                background: white;
                border-radius: var(--radius-lg);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                font-weight: 600;
                z-index: 1000;
                max-width: 400px;
                animation: slideInUp 0.4s ease-out;
                backdrop-filter: blur(10px);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                color: white;
                border-left: 4px solid white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                color: white;
                border-left: 4px solid white;
            }
            
            .notification-info {
                background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
                color: white;
                border-left: 4px solid white;
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutDown {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100px);
                    opacity: 0;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    bottom: 1rem;
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
    
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// ============================================================
// 6. SCROLL ANIMATIONS (Intersection Observer)
// ============================================================

/**
 * Trigger animations when elements scroll into view
 */
function setupScrollAnimations() {
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                
                // Log animation trigger
                if (entry.target.classList.contains('section')) {
                    const sectionId = entry.target.id;
                    console.log(`✓ Animating section: ${sectionId}`);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    console.log(`✓ Scroll animations enabled for ${sections.length} sections`);
}

// ============================================================
// 7. INPUT FOCUS EFFECTS
// ============================================================

/**
 * Add visual feedback for form input focus
 */
function setupInputFocusEffects() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        // Focus event
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.background = 'rgba(37, 99, 235, 0.05)';
        });
        
        // Blur event
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border)';
            this.style.background = 'var(--bg-dark)';
        });
        
        // Input event for real-time feedback
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'var(--success)';
            }
        });
    });
    
    console.log(`✓ Input focus effects enabled for ${inputs.length} fields`);
}

// ============================================================
// 8. KEYBOARD NAVIGATION
// ============================================================

/**
 * Support keyboard navigation
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Home key - go to top
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End key - go to bottom
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
    
    console.log('✓ Keyboard navigation enabled (Home, End, Tab)');
}

// ============================================================
// 9. SKILL BARS ANIMATION
// ============================================================

/**
 * Animate skill progress bars when they come into view
 */
function setupSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.progress-fill');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Restart animation by resetting and re-applying
                const bar = entry.target;
                bar.style.animation = 'none';
                
                // Trigger reflow to restart animation
                void bar.offsetWidth;
                
                bar.style.animation = 'fillBar 1.5s ease-out forwards';
                
                console.log('✓ Skill bar animation triggered');
                
                // Stop observing after animation
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    console.log(`✓ Skill bars animation enabled for ${skillBars.length} bars`);
}

// ============================================================
// 10. CARD HOVER EFFECTS
// ============================================================

/**
 * Enhanced hover effects for cards
 */
function setupCardHoverEffects() {
    const cards = document.querySelectorAll(
        '.stat-card, .subject-card, .project-card, .hobby-card'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log(`✓ Card hover effects enabled for ${cards.length} cards`);
}

// ============================================================
// 11. PAGE LOAD DETECTION
// ============================================================

/**
 * Log page load and run initial setup
 */
function setupPageLoad() {
    console.log('✓ Portfolio page loaded successfully');
    console.log(`✓ Timestamp: ${new Date().toLocaleString()}`);
}

// ============================================================
// 12. PERFORMANCE MONITORING
// ============================================================

/**
 * Monitor page performance
 */
function monitorPerformance() {
    if (window.performance) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`\n⏱️  Performance Metrics:`);
            console.log(`   Page Load Time: ${pageLoadTime}ms`);
            console.log(`   DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms\n`);
        });
    }
}

// ============================================================
// 13. ERROR HANDLING
// ============================================================

/**
 * Handle JavaScript errors gracefully
 */
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('JavaScript Error:', event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Promise Rejection:', event.reason);
    });
}

// ============================================================
// MAIN INITIALIZATION
// ============================================================

/**
 * Initialize all features when DOM is ready
 */
function initializePortfolio() {
    console.log('\n🚀 Initializing Portfolio Features...\n');
    
    // Setup all features
    setupPageLoad();
    setupSmoothScroll();
    setupActiveNavHighlighting();
    setupScrollToTopButton();
    setupFormValidation();
    setupScrollAnimations();
    setupInputFocusEffects();
    setupKeyboardNavigation();
    setupSkillBarsAnimation();
    setupCardHoverEffects();
    monitorPerformance();
    setupErrorHandling();
    
    console.log('\n✅ All Portfolio Features Initialized Successfully!\n');
}

// ============================================================
// RUN ON PAGE LOAD
// ============================================================

// Wait for DOM to be fully loaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
  } else {
    initializePortfolio();
  }
}


// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Scroll to a specific section
 * Usage: scrollToSection('about')
 */
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Get scroll percentage
 */
function getScrollPercentage() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    return Math.round((scrollTop / docHeight) * 100);
}

// ============================================================
// END OF JAVASCRIPT
// ============================================================