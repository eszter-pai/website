// Smooth page transition for back to portfolio link
document.addEventListener('DOMContentLoaded', function() {
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
