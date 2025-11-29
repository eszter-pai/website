// Smooth scroll for scroll-down button
document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#projects').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Hide scroll-down button after user scrolls
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-down');
    if (window.scrollY > 0) {
        scrollButton.style.opacity = '0';
        scrollButton.style.pointerEvents = 'none';
    } else {
        scrollButton.style.opacity = '1';
        scrollButton.style.pointerEvents = 'auto';
    }
});
