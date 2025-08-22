// Mobile Navigation Toggle Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing mobile navigation');
    
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    console.log('Elements found:', {
        navToggle: !!navToggle,
        navLinks: !!navLinks,
        header: !!header,
        nav: !!nav
    });
    
    // Check if elements exist before adding event listeners
    if (navToggle && navLinks) {
        console.log('Mobile navigation elements found, initializing...');
        
        // Toggle mobile menu on hamburger click
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked - Toggling mobile menu');
            console.log('Before toggle - navLinks classes:', navLinks.className);
            
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            console.log('After toggle - navLinks classes:', navLinks.className);
            console.log('navLinks has active class:', navLinks.classList.contains('active'));
            
            if (header) header.classList.toggle('active');
            if (nav) nav.classList.toggle('active');
            
            // Close mobile menu when clicking outside
            if (navLinks.classList.contains('active')) {
                console.log('Menu is now open - Adding outside click listener');
                document.addEventListener('click', closeMenuOnClickOutside);
            } else {
                console.log('Menu is now closed - Removing outside click listener');
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        });
        
        // Close mobile menu when clicking on a navigation link (but not Services toggle)
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Closing mobile menu via link click');
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                if (header) header.classList.remove('active');
                if (nav) nav.classList.remove('active');
                document.removeEventListener('click', closeMenuOnClickOutside);
            });
        });
        
        // Handle Services submenu toggle
        const servicesToggle = navLinks.querySelector('.services-toggle');
        const servicesSubmenu = navLinks.querySelector('.services-submenu');
        const servicesChevron = navLinks.querySelector('.services-chevron');
        
        if (servicesToggle && servicesSubmenu) {
            servicesToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Services toggle clicked');
                
                // Toggle submenu
                if (servicesSubmenu.style.maxHeight && servicesSubmenu.style.maxHeight !== '0px') {
                    // Close submenu
                    servicesSubmenu.style.maxHeight = '0px';
                    servicesChevron.style.transform = 'rotate(0deg)';
                    console.log('Services submenu closed');
                } else {
                    // Open submenu
                    servicesSubmenu.style.maxHeight = servicesSubmenu.scrollHeight + 'px';
                    servicesChevron.style.transform = 'rotate(180deg)';
                    console.log('Services submenu opened');
                }
            });
        }
        
        // Function to close menu when clicking outside
        function closeMenuOnClickOutside(e) {
            // Don't close if clicking on nav elements
            if (navToggle.contains(e.target) || navLinks.contains(e.target)) {
                return;
            }
            
            console.log('Closing mobile menu via outside click');
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            if (header) header.classList.remove('active');
            if (nav) nav.classList.remove('active');
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
        
        // Close menu on Escape key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                console.log('Closing mobile menu via Escape key');
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                if (header) header.classList.remove('active');
                if (nav) nav.classList.remove('active');
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        });
        
    } else {
        console.warn('Mobile navigation elements not found. NavToggle:', navToggle, 'NavLinks:', navLinks);
    }
});

// Additional page-specific functionality can be added here
console.log('Mobile navigation script loaded successfully');

// Comprehensive Scroll Animation System
// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing scroll animations...');
    
    // Scroll Animation Observer Configuration
    const observerOptions = {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create Intersection Observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'scroll-animate';
                
                // Apply animation immediately without delay
                element.classList.add('animate');
                
                // For keyframe-based animations
                if (animationType.includes('slide-up')) {
                    element.classList.add('animate-slide-up');
                } else if (animationType.includes('slide-left')) {
                    element.classList.add('animate-slide-left');
                } else if (animationType.includes('slide-right')) {
                    element.classList.add('animate-slide-right');
                } else if (animationType.includes('fade-scale')) {
                    element.classList.add('animate-fade-scale');
                } else if (animationType.includes('rotate-in')) {
                    element.classList.add('animate-rotate-in');
                } else if (animationType.includes('bounce-in')) {
                    element.classList.add('animate-bounce-in');
                }
                
                console.log(`Animated element with ${animationType}:`, element);
                
                // Stop observing this element after animation
                scrollObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll([
        '.scroll-animate',
        '.fade-in',
        '.slide-up',
        '.slide-left',
        '.slide-right',
        '.scale-up',
        '.rotate-in',
        '.bounce-in',
        '.elastic',
        '.blur-reveal'
    ].join(','));
    
    animatedElements.forEach((element, index) => {
        // Remove any existing delay data attributes for immediate animation
        if (element.dataset.delay) {
            delete element.dataset.delay;
        }
        
        scrollObserver.observe(element);
    });
    
    console.log(`Observing ${animatedElements.length} elements for scroll animations`);
    
    // Special handling for card grids and service sections
    const serviceCards = document.querySelectorAll('.service-card, .testimonial-card, .equipment-card');
    serviceCards.forEach((card, index) => {
        if (!card.classList.contains('scroll-animate') && !card.classList.contains('slide-up')) {
            card.classList.add('slide-up');
            // Remove delay for immediate animation
            scrollObserver.observe(card);
        }
    });
    
    // Enhanced scroll effects for hero sections
    const heroSections = document.querySelectorAll('section[class*="hero"], section:first-of-type');
    heroSections.forEach(hero => {
        const heroTitle = hero.querySelector('h1');
        const heroText = hero.querySelector('p');
        const heroButton = hero.querySelector('a');
        
        if (heroTitle && !heroTitle.classList.contains('fade-in')) {
            heroTitle.classList.add('fade-in');
            scrollObserver.observe(heroTitle);
        }
        
        if (heroText && !heroText.classList.contains('slide-up')) {
            heroText.classList.add('slide-up');
            scrollObserver.observe(heroText);
        }
        
        if (heroButton && !heroButton.classList.contains('bounce-in')) {
            heroButton.classList.add('bounce-in');
            scrollObserver.observe(heroButton);
        }
    });
    
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', () => updateParallax(entry.target));
                } else {
                    window.removeEventListener('scroll', () => updateParallax(entry.target));
                }
            });
        });
        
        parallaxElements.forEach(element => {
            parallaxObserver.observe(element);
        });
    }
    
    function updateParallax(element) {
        const rect = element.getBoundingClientRect();
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(rect.top * speed);
        element.style.transform = `translateY(${yPos}px)`;
    }
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = parseInt(element.dataset.duration) || 1200; // Faster counter animation
        const start = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Text reveal animation
    const textRevealElements = document.querySelectorAll('[data-text-reveal]');
    textRevealElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = words.map((word, index) => 
            `<span class="inline-block opacity-0 translate-y-4 transition-all duration-500" style="transition-delay: ${index * 50}ms">${word}</span>`
        ).join(' ');
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.classList.remove('opacity-0', 'translate-y-4');
                        span.classList.add('opacity-100', 'translate-y-0');
                    });
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        textObserver.observe(element);
    });
    
    // Smooth reveal for images
    const images = document.querySelectorAll('img[data-reveal]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('animate');
                
                // Add loading effect
                img.style.filter = 'blur(3px)';
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'filter 0.5s ease-out, transform 0.5s ease-out';
                
                img.onload = () => {
                    img.style.filter = 'blur(0)';
                    img.style.transform = 'scale(1)';
                };
                
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    console.log('Scroll animation system initialized successfully');
});