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

// Cat paw click animation
document.addEventListener('click', function(e) {
    // Don't show on clicks on links or buttons
    if (e.target.closest('a, button')) return;
    
    // Randomly choose between the two cat paw images
    const pawImages = 'img/cat_tap_2.png'
    
    // Random rotation angle between -45 and 45 degrees
    const randomRotation = Math.floor(Math.random() * 90) - 45;
    
    // Random flip (50% chance)
    const randomFlip = Math.random() > 0.5 ? -1 : 1;
    
    // Create the paw element
    const paw = document.createElement('img');
    paw.src = pawImages;
    paw.className = 'click-paw';
    paw.style.left = e.pageX + 'px';
    paw.style.top = e.pageY + 'px';
    paw.style.setProperty('--random-rotation', randomRotation + 'deg');
    paw.style.setProperty('--random-flip', randomFlip);
    
    document.body.appendChild(paw);
    
    // Remove the paw after animation completes
    setTimeout(() => {
        paw.remove();
    }, 600);
});
