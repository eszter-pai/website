// Smooth scroll for scroll-down button
document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#projects').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('language') || 'en';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Add click listeners to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
    
    function setLanguage(lang) {
        // Update active button
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all elements with translation data with smooth transition
        const elements = document.querySelectorAll('[data-en][data-de]');
        
        // Fade out
        elements.forEach(element => {
            element.classList.add('fade-out');
        });
        
        // Wait for fade out, then change content and fade in
        setTimeout(() => {
            elements.forEach(element => {
                const translation = element.getAttribute('data-' + lang);
                if (translation) {
                    element.innerHTML = translation;
                }
            });
            
            // Fade in
            setTimeout(() => {
                elements.forEach(element => {
                    element.classList.remove('fade-out');
                });
            }, 50);
        }, 300);
        
        currentLang = lang;
    }
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

// Create cursor follower paw
const cursorPaw = document.createElement('img');
cursorPaw.id = 'cursor-paw';
cursorPaw.src = 'img/cat_tap_2.png';
document.body.appendChild(cursorPaw);

// Check if device is mobile
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// Cursor paw position tracking with lag
let pawX = 0;
let pawY = 0;
let targetX = 0;
let targetY = 0;
let rotation = 0;

// Track mouse movement for cursor paw
document.addEventListener('mousemove', function(e) {
    if (isMobile) return; // Skip on mobile
    
    targetX = e.clientX;
    targetY = e.clientY;
    
    // Check if hovering over interactive elements
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    if (hoveredElement && (hoveredElement.closest('a, button, input, textarea, select, .article-card, .pink-circle, .profile-image, .cta-button, .social-icons, .scroll-down, h1, h2, h3, p, img'))) {
        cursorPaw.classList.add('hidden');
    } else {
        cursorPaw.classList.remove('hidden');
    }
});

// Animate cursor paw with lag and rotation
function animateCursorPaw() {
    if (isMobile) return; // Skip on mobile
    
    // Calculate distance between paw and cursor
    const distance = Math.sqrt(Math.pow(targetX - pawX, 2) + Math.pow(targetY - pawY, 2));
    
    // If paw is close to cursor (within 5px), snap to position; otherwise use lag
    let lag;
    if (distance < 5) {
        lag = 1; // No lag, instant follow
    } else {
        lag = 0.05; // Normal lag effect
    }
    
    pawX += (targetX - pawX) * lag;
    pawY += (targetY - pawY) * lag;
    
    // Add slight randomness only when lagging
    let randomOffsetX = 0;
    let randomOffsetY = 0;
    if (lag < 1) {
        randomOffsetX = (Math.random() - 0.5) * 2;
        randomOffsetY = (Math.random() - 0.5) * 2;
    }
    
    // Slowly rotate the paw
    rotation += 0.5;
    
    cursorPaw.style.left = (pawX + randomOffsetX) + 'px';
    cursorPaw.style.top = (pawY + randomOffsetY) + 'px';
    cursorPaw.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    
    requestAnimationFrame(animateCursorPaw);
}

if (!isMobile) {
    animateCursorPaw();
}

// Hide cursor paw when mouse leaves the window
document.addEventListener('mouseleave', function() {
    cursorPaw.classList.add('hidden');
});

document.addEventListener('mouseenter', function() {
    cursorPaw.classList.remove('hidden');
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
