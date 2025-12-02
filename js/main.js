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
        
        // Update CV download link
        const cvLink = document.getElementById('cv-download');
        if (cvLink) {
            cvLink.href = lang === 'en' ? 'img/resume_EN_Eszter.pdf' : 'img/resume_DE_Eszter.pdf';
        }
        
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
let rotation = 45; // Default rotation (image points to right side 45 degrees)

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
    if (distance < 100) {
        lag = 0; // No lag, instant follow
    } else {
        lag = 0.02; // Normal lag effect

    }

    // Calculate direction angle before updating position
    const deltaX = targetX - pawX;
    const deltaY = targetY - pawY;
    
    // Only update rotation if there's significant movement
    if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        // Calculate angle in degrees (atan2 returns radians)
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 20;
        rotation = angle;
    }

    pawX += (targetX - pawX) * lag;
    pawY += (targetY - pawY) * lag;
    
    cursorPaw.style.left = (pawX) + 'px';
    cursorPaw.style.top = (pawY) + 'px';
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
