// Smooth scroll for scroll-down button
document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#projects').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Smooth page transitions for Read More links
document.addEventListener('DOMContentLoaded', function() {
    // Remove page-transition class on page load (for browser back/forward navigation)
    document.body.classList.remove('page-transition');
    
    // Get all internal navigation links (Read More buttons)
    const navigationLinks = document.querySelectorAll('a.read-more[href$=".html"]');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Check if hovering over interactive elements (but not during mouse game)
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    
    // During mouse game, always show paw regardless of what's underneath
    if (typeof isMouseActive !== 'undefined' && isMouseActive) {
        cursorPaw.classList.remove('hidden');
    } else if (hoveredElement && (hoveredElement.closest('a, button, input, textarea, select, .article-card, .pink-circle, .profile-image, .cta-button, .social-icons, .scroll-down, h1, h2, h3, p, img'))) {
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
    let mouseWrapper = null;
    let progressRing = null;
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
    let isReturningToCheese = false;
    let captureProgress = 0;
    let captureStartTime = null;
    const CAPTURE_DURATION = 800; // 0.8 seconds to capture
    let isHoveringMouse = false; // Track if cursor is hovering over mouse

    // Get areas to avoid (empty - mouse can run anywhere)
    function getAvoidAreas() {
        return [];
    }

    // Check if point overlaps with avoid areas
    function isInAvoidArea(x, y, padding = 50) {
        // Mouse can run anywhere on screen
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

    // Create progress bar that follows cursor
    function createProgressBar() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'capture-progress');
        svg.setAttribute('width', '70');
        svg.setAttribute('height', '70');
        svg.setAttribute('viewBox', '0 0 70 70');
        
        // Background circle (white track)
        const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bgCircle.setAttribute('cx', '35');
        bgCircle.setAttribute('cy', '35');
        bgCircle.setAttribute('r', '32');
        bgCircle.setAttribute('fill', 'none');
        bgCircle.setAttribute('stroke', 'white');
        bgCircle.setAttribute('stroke-width', '4');
        bgCircle.setAttribute('opacity', '0.3');
        
        // Foreground circle (pink progress)
        const fgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        fgCircle.setAttribute('cx', '35');
        fgCircle.setAttribute('cy', '35');
        fgCircle.setAttribute('r', '32');
        fgCircle.setAttribute('fill', 'none');
        fgCircle.setAttribute('stroke', '#F4A8B8');
        fgCircle.setAttribute('stroke-width', '4');
        fgCircle.setAttribute('stroke-linecap', 'round');
        fgCircle.setAttribute('class', 'progress-fill');
        
        // Calculate circumference for stroke-dasharray
        const circumference = 2 * Math.PI * 32;
        fgCircle.setAttribute('stroke-dasharray', circumference);
        fgCircle.setAttribute('stroke-dashoffset', circumference);
        
        svg.appendChild(bgCircle);
        svg.appendChild(fgCircle);
        
        return svg;
    }

    // Update progress bar fill
    function updateProgressBar(progress) {
        if (!progressRing) return;
        
        const circle = progressRing.querySelector('.progress-fill');
        if (!circle) return;
        
        const circumference = 2 * Math.PI * 32;
        const offset = circumference * (1 - progress / 100);
        circle.setAttribute('stroke-dashoffset', offset);
    }

    // Animate mouse movement
    function animateMouse(timestamp) {
        if (!isMouseActive || !mouseElement) return;

        // Handle return to cheese behavior
        if (isReturningToCheese) {
            const deltaX = targetWaypointX - mouseX;
            const deltaY = targetWaypointY - mouseY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Check if reached cheese
            if (distance < 10) {
                // Stop at cheese and clean up
                isMouseActive = false;
                isReturningToCheese = false;
                if (mouseAnimationId) {
                    cancelAnimationFrame(mouseAnimationId);
                    mouseAnimationId = null;
                }
                
                // Fade out mouse
                if (mouseWrapper) {
                    mouseWrapper.style.opacity = '0';
                }
                
                setTimeout(() => {
                    if (mouseWrapper) {
                        mouseWrapper.remove();
                        mouseWrapper = null;
                        mouseElement = null;
                    }
                    
                    if (progressRing) {
                        progressRing.remove();
                        progressRing = null;
                    }
                    
                    if (cheeseDialogue) {
                        cheeseDialogue.remove();
                        cheeseDialogue = null;
                    }
                    
                    document.querySelectorAll('.footprint').forEach(fp => {
                        fp.style.opacity = '0';
                        setTimeout(() => fp.remove(), 1600);
                    });
                    
                    cheeseIcon.classList.remove('disabled');
                }, 300);
                
                return;
            }
            
            // Move toward cheese at 2x speed (no collision avoidance)
            const speed = 5;
            const normalizedX = deltaX / distance;
            const normalizedY = deltaY / distance;
            mouseX += normalizedX * speed;
            mouseY += normalizedY * speed;
            
            // Update rotation
            const targetAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;
            let angleDiff = targetAngle - currentRotation;
            while (angleDiff > 180) angleDiff -= 360;
            while (angleDiff < -180) angleDiff += 360;
            currentRotation += angleDiff * 0.15;
            mouseRotation = currentRotation;
            
            // Create footprint trail
            if (timestamp - lastFootprintTime > 120) {
                createFootprint(mouseX, mouseY);
                lastFootprintTime = timestamp;
            }
            
            // Update position
            if (mouseWrapper) {
                mouseWrapper.style.left = mouseX + 'px';
                mouseWrapper.style.top = mouseY + 'px';
                mouseWrapper.style.transform = `translate(-50%, -50%)`;
                mouseElement.style.transform = `translate(-50%, -50%) rotate(${mouseRotation}deg)`;
            }
            
            mouseAnimationId = requestAnimationFrame(animateMouse);
            return;
        }

        // Change waypoint every 1.5 seconds
        if (timestamp - waypointChangeTime > 1500) {
            const waypoint = generateWaypoint();
            targetWaypointX = waypoint.x;
            targetWaypointY = waypoint.y;
            waypointChangeTime = timestamp;
        }

        // Check if cursor is hovering over mouse
        if (mouseWrapper) {
            const mouseRect = mouseWrapper.getBoundingClientRect();
            // Use paw position for hover detection - access from global scope
            const pawRect = cursorPaw.getBoundingClientRect();
            const pawCenterX = pawRect.left + pawRect.width / 2;
            const pawCenterY = pawRect.top + pawRect.height / 2;
            
            isHoveringMouse = (
                pawCenterX >= mouseRect.left &&
                pawCenterX <= mouseRect.right &&
                pawCenterY >= mouseRect.top &&
                pawCenterY <= mouseRect.bottom
            );
            
            // Debug logging
            if (isHoveringMouse) {
                // Show progress bar and update its position
                if (progressRing) {
                    progressRing.classList.add('visible');
                    progressRing.style.left = (pawX) + 'px';
                    progressRing.style.top = (pawY) + 'px';
                }
                
                // Start or continue capture progress
                if (!captureStartTime) {
                    captureStartTime = timestamp;
                }
                
                const elapsed = timestamp - captureStartTime;
                captureProgress = Math.min(100, (elapsed / CAPTURE_DURATION) * 100);
                updateProgressBar(captureProgress);
                
                // Check if capture is complete
                if (captureProgress >= 100) {
                    // Capture complete!
                    isMouseActive = false;
                    if (mouseAnimationId) {
                        cancelAnimationFrame(mouseAnimationId);
                        mouseAnimationId = null;
                    }
                    
                    // Hide progress bar
                    if (progressRing) {
                        progressRing.classList.remove('visible');
                    }
                    
                    // Create paw slap animation at mouse position
                    const slapPaw = document.createElement('img');
                    slapPaw.src = 'img/cat_tap_2.png';
                    slapPaw.className = 'slap-paw';
                    slapPaw.style.position = 'fixed';
                    slapPaw.style.left = mouseX + 'px';
                    slapPaw.style.top = mouseY + 'px';
                    slapPaw.style.width = '80px';
                    slapPaw.style.height = '80px';
                    slapPaw.style.transform = 'translate(-50%, -50%) scale(0)';
                    slapPaw.style.pointerEvents = 'none';
                    slapPaw.style.zIndex = '10000';
                    slapPaw.style.transition = 'transform 0.15s ease-out';
                    document.body.appendChild(slapPaw);
                    
                    // Animate paw slap
                    setTimeout(() => {
                        slapPaw.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(15deg)';
                    }, 10);
                    
                    // Play squeak sound
                    const squeakSound = new Audio('img/rat-squeaks-4-fx.mp3');
                    squeakSound.volume = 0.3;
                    squeakSound.play().catch(err => console.log('Audio play failed:', err));
                    
                    // Update dialogue
                    if (cheeseDialogue) {
                        cheeseDialogue.textContent = 'Thank you!';
                        
                        // Store reference to current dialogue before timeout
                        const dialogueToRemove = cheeseDialogue;
                        cheeseDialogue = null; // Clear reference immediately
                        
                        // Remove "Thank you!" dialogue after 2 seconds
                        setTimeout(() => {
                            if (dialogueToRemove && dialogueToRemove.parentElement) {
                                dialogueToRemove.remove();
                            }
                        }, 2000);
                    }
                    
                    // Fade out mouse and paw
                    setTimeout(() => {
                        if (mouseWrapper) {
                            mouseWrapper.style.opacity = '0';
                        }
                        slapPaw.style.opacity = '0';
                        slapPaw.style.transition = 'opacity 0.3s ease, transform 0.15s ease-out';
                    }, 200);
                    
                    // Cleanup after animations
                    setTimeout(() => {
                        if (mouseWrapper) {
                            mouseWrapper.remove();
                            mouseWrapper = null;
                            mouseElement = null;
                        }
                        
                        if (progressRing) {
                            progressRing.remove();
                            progressRing = null;
                        }
                        
                        slapPaw.remove();
                        
                        document.querySelectorAll('.footprint').forEach(fp => {
                            fp.style.opacity = '0';
                            setTimeout(() => fp.remove(), 1600);
                        });
                    }, 500);
                    
                    // Re-enable cheese after delay
                    setTimeout(() => {
                        cheeseIcon.classList.remove('disabled');
                    }, 2000);
                    
                    return;
                }
            } else {
                // Hide progress bar and reset progress
                if (progressRing) {
                    progressRing.classList.remove('visible');
                }
                captureStartTime = null;
                captureProgress = 0;
                updateProgressBar(0);
            }
        } else {
            isHoveringMouse = false;
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
        
        // Toggle: Give up if game is active
        if (isMouseActive && !isReturningToCheese) {
            // Trigger return to cheese
            isReturningToCheese = true;
            captureProgress = 0;
            captureStartTime = null;
            
            // Play squeak sound when giving up
            const giveUpSound = new Audio('img/rat-squeaks-1-fx.mp3');
            giveUpSound.volume = 0.3;
            giveUpSound.play().catch(err => console.log('Audio play failed:', err));
            
            // Remove original dialogue immediately
            if (cheeseDialogue) {
                cheeseDialogue.remove();
                cheeseDialogue = null;
            }
            
            // Create "lol" dialogue that follows the rat
            const lolDialogue = document.createElement('div');
            lolDialogue.className = 'rat-dialogue';
            lolDialogue.textContent = 'lol';
            lolDialogue.style.position = 'fixed';
            lolDialogue.style.background = 'var(--white)';
            lolDialogue.style.color = 'var(--dark-bg)';
            lolDialogue.style.padding = '0.6rem 1rem';
            lolDialogue.style.borderRadius = '10px';
            lolDialogue.style.fontFamily = "'Courier New', Courier, monospace";
            lolDialogue.style.fontSize = '0.9rem';
            lolDialogue.style.fontWeight = 'bold';
            lolDialogue.style.zIndex = '10001';
            lolDialogue.style.pointerEvents = 'none';
            lolDialogue.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
            lolDialogue.style.transform = 'rotate(8deg)';
            document.body.appendChild(lolDialogue);
            
            // Position dialogue above the rat - update immediately without transition
            function updateLolDialoguePosition() {
                if (lolDialogue && mouseWrapper && isReturningToCheese) {
                    lolDialogue.style.left = mouseX + 'px';
                    lolDialogue.style.top = (mouseY - 50) + 'px';
                    lolDialogue.style.transform = 'translate(-50%, -100%) rotate(8deg)';
                }
            }
            
            // Update dialogue position on each animation frame
            const originalAnimateMouse = animateMouse;
            const dialogueInterval = setInterval(updateLolDialoguePosition, 16);
            
            // Remove "lol" dialogue after 1.5 seconds
            setTimeout(() => {
                clearInterval(dialogueInterval);
                if (lolDialogue) {
                    lolDialogue.remove();
                }
            }, 1500);
            
            // Hide and reset progress bar
            if (progressRing) {
                progressRing.classList.remove('visible');
                progressRing.remove();
                progressRing = null;
            }
            captureProgress = 0;
            captureStartTime = null;
            
            // Set target to cheese position
            const cheeseRect = cheeseIcon.getBoundingClientRect();
            targetWaypointX = cheeseRect.left + cheeseRect.width / 2;
            targetWaypointY = cheeseRect.top + cheeseRect.height / 2;
            
            return;
        }
        
        // Don't start new game if already returning or active
        if (isMouseActive || isReturningToCheese) return;

        isMouseActive = true;
        cheeseIcon.classList.add('disabled');

        // Create dialogue bubble
        cheeseDialogue = document.createElement('div');
        cheeseDialogue.className = 'cheese-dialogue';
        cheeseDialogue.innerHTML = 'Catch the Rat<br>or<br>Cheese to Give Up';
        document.body.appendChild(cheeseDialogue);

        // Create progress bar and attach to cursor
        progressRing = createProgressBar();
        document.body.appendChild(progressRing);

        // Create mouse element with wrapper for larger hit area
        mouseWrapper = document.createElement('div');
        mouseWrapper.style.position = 'fixed';
        mouseWrapper.style.width = '80px';
        mouseWrapper.style.height = '80px';
        mouseWrapper.style.cursor = 'pointer';
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

        // Start animation
        mouseAnimationId = requestAnimationFrame(animateMouse);
    });
}

// Handle page show event (for browser back/forward navigation)
window.addEventListener('pageshow', function(event) {
    document.body.classList.remove('page-transition');
});
