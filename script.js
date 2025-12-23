// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Profile image error handling
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            // Create a fallback element
            const fallback = document.createElement('div');
            fallback.innerHTML = '👨‍🔬';
            fallback.style.cssText = `
                font-size: 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: #4a5568;
            `;
            this.parentNode.appendChild(fallback);
        });
    }

    // Simple fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to publication and experience items
    const animateElements = document.querySelectorAll('.publication, .experience, .news-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // External links open in new tab
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto"]');
    externalLinks.forEach(link => {
        if (link.hostname !== window.location.hostname && !link.href.startsWith('mailto:')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Print functionality
    function initPrint() {
        if (window.location.search.includes('print=true')) {
            window.print();
        }
    }
    initPrint();
});

// Simple scroll progress indicator (optional)
window.addEventListener('scroll', () => {
    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // You can use this to update a progress bar if you add one later
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress + '%');
});

// Email protection (simple obfuscation)
document.addEventListener('DOMContentLoaded', function() {
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(el => {
        const email = el.getAttribute('data-email');
        el.href = 'mailto:' + email;
        el.textContent = email;
    });
});

// Copy to clipboard functionality for contact info
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Simple feedback - you could enhance this with a toast notification
        console.log('Copied to clipboard: ' + text);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// CV download tracking (optional analytics)
document.addEventListener('DOMContentLoaded', function() {
    const cvLinks = document.querySelectorAll('a[href*="CV"], a[href*="cv"], a[href*="resume"]');
    cvLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here if needed
            console.log('CV downloaded');
        });
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // ESC key functionality
    if (e.key === 'Escape') {
        // Remove focus from any active elements
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
    
    // Ctrl/Cmd + P for print-friendly view
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.open(window.location.href + '?print=true', '_blank');
    }
});

// Simple performance monitoring
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('Page loaded in', loadTime, 'ms');
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        z-index: 1000;
        transition: top 0.3s;
        text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const container = document.querySelector('.container');
    if (container) {
        container.setAttribute('role', 'main');
        container.id = 'main-content';
    }
});

// Simple error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.message);
    // Gracefully handle errors without breaking the user experience
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Gracefully handle promise rejections
});