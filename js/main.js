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
    // Don't show on clicks on links or buttons or cheese/mouse
    if (e.target.closest('a, button, .cheese-icon, .mouse-icon')) return;
    
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

// Cheese and Mouse Game
if (!isMobile) {
    // Create cheese icon
    const cheeseIcon = document.createElement('img');
    cheeseIcon.src = 'img/cheese.png';
    cheeseIcon.className = 'cheese-icon';
    document.body.appendChild(cheeseIcon);

    let isMouseActive = false;
    let mouseElement = null;
    let mouseX = 0;
    let mouseY = 0;
    let targetWaypointX = 0;
    let targetWaypointY = 0;
    let mouseRotation = 0;
    let mouseAnimationId = null;
    let lastFootprintTime = 0;
    let waypointChangeTime = 0;
    let cheeseDialogue = null;
    let currentRotation = 0; // Track current rotation for smooth transitions

    // Get areas to avoid
    function getAvoidAreas() {
        const areas = [];
        
        // Hero content area
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const rect = heroContent.getBoundingClientRect();
            areas.push({
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom
            });
        }

        // Article cards
        const articleCards = document.querySelectorAll('.article-card');
        articleCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            areas.push({
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom
            });
        });

        return areas;
    }

    // Check if point overlaps with avoid areas
    function isInAvoidArea(x, y, padding = 50) {
        const avoidAreas = getAvoidAreas();
        for (const area of avoidAreas) {
            if (x >= area.left - padding && x <= area.right + padding &&
                y >= area.top - padding && y <= area.bottom + padding) {
                return true;
            }
        }
        return false;
    }

    // Generate random waypoint
    function generateWaypoint() {
        const padding = 50;
        const maxAttempts = 30;
        
        for (let i = 0; i < maxAttempts; i++) {
            const x = padding + Math.random() * (window.innerWidth - 2 * padding);
            const y = padding + Math.random() * (window.innerHeight - 2 * padding);
            
            if (!isInAvoidArea(x, y)) {
                return { x, y };
            }
        }
        
        // Fallback: find a safe position in the bottom half of the screen
        for (let i = 0; i < 10; i++) {
            const x = padding + Math.random() * (window.innerWidth - 2 * padding);
            const y = (window.innerHeight / 2) + Math.random() * (window.innerHeight / 2 - padding);
            
            if (!isInAvoidArea(x, y, 20)) {
                return { x, y };
            }
        }
        
        // Last resort: bottom right area away from cheese
        return {
            x: window.innerWidth - 200,
            y: window.innerHeight - 200
        };
    }

    // Create footprint
    function createFootprint(x, y) {
        const footprint = document.createElement('div');
        footprint.className = 'footprint';
        footprint.style.left = x + 'px';
        footprint.style.top = y + 'px';
        document.body.appendChild(footprint);
        
        // Fade out and remove
        setTimeout(() => {
            footprint.style.opacity = '0';
        }, 50);
        
        setTimeout(() => {
            footprint.remove();
        }, 1600);
    }

    // Animate mouse movement
    function animateMouse(timestamp) {
        if (!isMouseActive || !mouseElement) return;

        // Change waypoint every 1.5 seconds
        if (timestamp - waypointChangeTime > 1500) {
            const waypoint = generateWaypoint();
            targetWaypointX = waypoint.x;
            targetWaypointY = waypoint.y;
            waypointChangeTime = timestamp;
        }

        // Move mouse toward waypoint
        const deltaX = targetWaypointX - mouseX;
        const deltaY = targetWaypointY - mouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Always keep moving
        const speed = 2.5;
        const normalizedX = deltaX / distance;
        const normalizedY = deltaY / distance;
        const moveX = normalizedX * speed;
        const moveY = normalizedY * speed;
        
        // Check if next position would be in avoid area
        const nextX = mouseX + moveX;
        const nextY = mouseY + moveY;
        
        if (!isInAvoidArea(nextX, nextY, 30)) {
            // Clear path ahead
            mouseX = nextX;
            mouseY = nextY;
        } else {
            // Hit obstacle - turn back immediately by generating new waypoint in opposite direction
            const waypoint = generateWaypoint();
            targetWaypointX = waypoint.x;
            targetWaypointY = waypoint.y;
            waypointChangeTime = timestamp;
            
            // Move in opposite direction temporarily
            const oppositeX = mouseX - moveX;
            const oppositeY = mouseY - moveY;
            
            if (!isInAvoidArea(oppositeX, oppositeY, 30)) {
                mouseX = oppositeX;
                mouseY = oppositeY;
            } else {
                // If can't go back, try perpendicular movements
                if (!isInAvoidArea(mouseX + speed, mouseY, 30)) {
                    mouseX += speed;
                } else if (!isInAvoidArea(mouseX - speed, mouseY, 30)) {
                    mouseX -= speed;
                } else if (!isInAvoidArea(mouseX, mouseY + speed, 30)) {
                    mouseY += speed;
                } else if (!isInAvoidArea(mouseX, mouseY - speed, 30)) {
                    mouseY -= speed;
                }
            }
        }

        // Update rotation based on actual movement direction
        const actualDeltaX = targetWaypointX - mouseX;
        const actualDeltaY = targetWaypointY - mouseY;
        const targetAngle = Math.atan2(actualDeltaY, actualDeltaX) * (180 / Math.PI) - 90;
        
        // Smooth rotation transition with interpolation
        let angleDiff = targetAngle - currentRotation;
        
        // Normalize angle difference to -180 to 180 range for shortest rotation
        while (angleDiff > 180) angleDiff -= 360;
        while (angleDiff < -180) angleDiff += 360;
        
        // Apply smooth rotation with 0.15 interpolation factor
        currentRotation += angleDiff * 0.15;
        mouseRotation = currentRotation;

        // Create footprint trail
        if (timestamp - lastFootprintTime > 120) {
            createFootprint(mouseX, mouseY);
            lastFootprintTime = timestamp;
        }

        // Update mouse position - use wrapper if it exists
        const targetElement = mouseElement.parentElement || mouseElement;
        targetElement.style.left = mouseX + 'px';
        targetElement.style.top = mouseY + 'px';
        
        if (mouseElement.parentElement) {
            // If using wrapper, only rotate the inner img
            targetElement.style.transform = `translate(-50%, -50%)`;
            mouseElement.style.transform = `translate(-50%, -50%) rotate(${mouseRotation}deg)`;
        } else {
            targetElement.style.transform = `translate(-50%, -50%) rotate(${mouseRotation}deg)`;
        }

        mouseAnimationId = requestAnimationFrame(animateMouse);
    }

    // Handle cheese click
    cheeseIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (isMouseActive) return;

        isMouseActive = true;
        cheeseIcon.classList.add('disabled');

        // Create dialogue bubble
        cheeseDialogue = document.createElement('div');
        cheeseDialogue.className = 'cheese-dialogue';
        cheeseDialogue.textContent = 'Catch that rat!';
        document.body.appendChild(cheeseDialogue);

        // Create mouse element with wrapper for larger hit area
        const mouseWrapper = document.createElement('div');
        mouseWrapper.style.position = 'fixed';
        mouseWrapper.style.width = '80px';
        mouseWrapper.style.height = '80px';
        mouseWrapper.style.cursor = 'url("../img/cat_cursor.png"), pointer';
        mouseWrapper.style.zIndex = '9998';
        mouseWrapper.style.pointerEvents = 'auto';
        mouseWrapper.style.transition = 'opacity 0.3s ease';
        
        mouseElement = document.createElement('img');
        mouseElement.src = 'img/mouse.png';
        mouseElement.style.width = '40px';
        mouseElement.style.height = '40px';
        mouseElement.style.position = 'absolute';
        mouseElement.style.top = '50%';
        mouseElement.style.left = '50%';
        mouseElement.style.transform = 'translate(-50%, -50%)';
        mouseElement.style.pointerEvents = 'none';
        
        mouseWrapper.appendChild(mouseElement);
        
        // Start mouse at cheese position
        const cheeseRect = cheeseIcon.getBoundingClientRect();
        mouseX = cheeseRect.left + cheeseRect.width / 2;
        mouseY = cheeseRect.top + cheeseRect.height / 2;
        
        mouseWrapper.style.left = mouseX + 'px';
        mouseWrapper.style.top = mouseY + 'px';
        mouseWrapper.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(mouseWrapper);

        // Generate initial waypoint
        const waypoint = generateWaypoint();
        targetWaypointX = waypoint.x;
        targetWaypointY = waypoint.y;
        waypointChangeTime = performance.now();
        lastFootprintTime = performance.now();
        
        // Initialize rotation based on initial direction
        const initialDeltaX = targetWaypointX - mouseX;
        const initialDeltaY = targetWaypointY - mouseY;
        currentRotation = Math.atan2(initialDeltaY, initialDeltaX) * (180 / Math.PI) - 90;
        mouseRotation = currentRotation;

        // Handle mouse click (capture)
        mouseWrapper.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Show cat paw animation at click position
            const randomRotation = Math.floor(Math.random() * 90) - 45;
            const randomFlip = Math.random() > 0.5 ? -1 : 1;
            
            const paw = document.createElement('img');
            paw.src = 'img/cat_tap_2.png';
            paw.className = 'click-paw';
            paw.style.left = e.pageX + 'px';
            paw.style.top = e.pageY + 'px';
            paw.style.setProperty('--random-rotation', randomRotation + 'deg');
            paw.style.setProperty('--random-flip', randomFlip);
            
            document.body.appendChild(paw);
            
            setTimeout(() => {
                paw.remove();
            }, 600);
            
            // Stop animation
            isMouseActive = false;
            if (mouseAnimationId) {
                cancelAnimationFrame(mouseAnimationId);
                mouseAnimationId = null;
            }

            // Play squeak sound
            const squeakSound = new Audio('img/rat-squeaks-4-fx.mp3');
            squeakSound.play().catch(err => console.log('Audio play failed:', err));

            // Fade out mouse
            mouseWrapper.style.opacity = '0';
            
            // Remove mouse after fade
            setTimeout(() => {
                if (mouseWrapper) {
                    mouseWrapper.remove();
                    mouseElement = null;
                }
                
                // Remove dialogue
                if (cheeseDialogue) {
                    cheeseDialogue.remove();
                    cheeseDialogue = null;
                }
                
                // Clear remaining footprints
                document.querySelectorAll('.footprint').forEach(fp => {
                    fp.style.opacity = '0';
                    setTimeout(() => fp.remove(), 1600);
                });
                
                // Re-enable cheese
                cheeseIcon.classList.remove('disabled');
            }, 300);
        });

        // Start animation
        mouseAnimationId = requestAnimationFrame(animateMouse);
    });
}
