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
        
        // Close mobile menu when clicking on a navigation link
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