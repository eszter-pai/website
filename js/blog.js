// Smooth page transition for back to portfolio link
document.addEventListener('DOMContentLoaded', function() {
    // Remove page-transition class on page load (for browser back/forward navigation)
    document.body.classList.remove('page-transition');
    
    const backLink = document.querySelector('.back-link');
    
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply transition for internal HTML pages
            if (href && href.endsWith('.html')) {
                e.preventDefault();
                
                // Add fade-out class
                document.body.classList.add('page-transition');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    }
});

// handle page show event (for browser back/forward)
window.addEventListener('pageshow', function(event) {
    document.body.classList.remove('page-transition');
});
