// Magic mode activation and cursor effects
let magicActive = false;
const cursor = document.querySelector('.custom-cursor');
const cursorGlow = document.querySelector('.cursor-glow');

// Create stars dynamically
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${Math.random() * 4 + 2}s ease-in-out infinite alternate;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8);
        `;
        starsContainer.appendChild(star);
    }
}

// Create twinkling animation
function addTwinkleStyle() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.2; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Create floating particles
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const numberOfParticles = 30;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 20}s;
            animation-duration: ${Math.random() * 10 + 15}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Create shooting stars
function createShootingStars() {
    const shootingContainer = document.querySelector('.shooting-stars');
    
    function addShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 50}%;
            animation-delay: 0s;
        `;
        shootingContainer.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 3000);
    }
    
    // Create shooting stars at random intervals
    setInterval(() => {
        if (Math.random() < 0.3) {
            addShootingStar();
        }
    }, 5000);
}

// Initialize background effects
function initializeBackground() {
    createStars();
    addTwinkleStyle();
    createFloatingParticles();
    createShootingStars();
}

// Activate magic mode on first mouse movement
document.addEventListener('mousemove', (e) => {
    if (!magicActive) {
        document.body.classList.add('magic-active');
        magicActive = true;
    }
    
    // Update cursor position
    cursor.style.left = e.clientX - 6 + 'px';
    cursor.style.top = e.clientY - 6 + 'px';
    cursorGlow.style.left = e.clientX - 150 + 'px';
    cursorGlow.style.top = e.clientY - 150 + 'px';
    
    // Create sparkle effect occasionally
    if (Math.random() < 0.1) {
        createSparkle(e.clientX, e.clientY);
    }
    
    // Create cursor trail
    if (Math.random() < 0.3) {
        createCursorTrail(e.clientX, e.clientY);
    }
});

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x - 4 + 'px';
    sparkle.style.top = y - 4 + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

// Create cursor trail
function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x - 3 + 'px';
    trail.style.top = y - 3 + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 800);
}

// Enhanced cursor interaction
const interactiveElements = document.querySelectorAll(
    '.skill-card, .project-card, .leadership-card, .social-link, button, .case-study-card, .experience-content, .form-input, .tag'
);

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover-large');
        // Create extra sparkles on hover
        setTimeout(() => {
            const rect = element.getBoundingClientRect();
            createSparkle(rect.left + rect.width/2, rect.top + rect.height/2);
        }, 100);
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover-large', 'cursor-hover-medium');
    });
});

// Scroll reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add extra sparkle effect when elements come into view
            const rect = entry.target.getBoundingClientRect();
            setTimeout(() => {
                createSparkle(rect.left + rect.width/2, rect.top + rect.height/2);
            }, 200);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// Case study modal functionality
function openCaseStudy() {
    document.getElementById('caseStudyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Create sparkle burst effect
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
}

function closeCaseStudy() {
    document.getElementById('caseStudyModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCaseStudy();
    }
});

// Close modal on backdrop click
document.getElementById('caseStudyModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('case-study-modal')) {
        closeCaseStudy();
    }
});

// Form submission handling with enhanced effects
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const button = e.target.querySelector('.submit-btn');
    const originalText = button.textContent;
    
    // Create sparkle burst effect
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const rect = button.getBoundingClientRect();
            createSparkle(
                rect.left + Math.random() * rect.width,
                rect.top + Math.random() * rect.height
            );
        }, i * 50);
    }
    
    // Animate button
    button.textContent = 'Sending...';
    button.style.transform = 'scale(0.95)';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
        button.style.transform = 'scale(1)';
        
        // Create success sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 100);
        }
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.transform = '';
            button.disabled = false;
            e.target.reset();
        }, 2000);
    }, 1500);
});

// Smooth scroll for internal navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.2;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = scrolled * speed;
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Add subtle floating animation to skill cards with enhanced effects
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', () => {
        if (magicActive) {
            card.style.animation = 'none';
            card.style.transform = 'translateY(-8px) rotateX(5deg)';
            
            // Create sparkle ring around the card
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const radius = Math.max(rect.width, rect.height) / 2 + 20;
            
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                setTimeout(() => {
                    createSparkle(x, y);
                }, i * 50);
            }
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = '';
        card.style.transform = '';
    });
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        // Create floating sparkles around project cards
        const rect = card.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
    });
});

// Add magical glow effect to form inputs
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
        // Create gentle sparkle effect around focused input
        const rect = input.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top - 10
                );
            }, i * 200);
        }
    });
});

// Performance optimization for scroll events
let ticking = false;
function updateScrollEffects() {
    // Add any additional scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Mouse leave effect - fade cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    if (magicActive) {
        cursor.style.opacity = '1';
        cursorGlow.style.opacity = '1';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Riya\'s magical starry portfolio loaded successfully!');
    
    // Initialize background effects
    initializeBackground();
    
    // Add stagger animation to grid items
    const animateGridItems = (selector, delay = 100) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.style.animationDelay = `${index * delay}ms`;
        });
    };
    
    animateGridItems('.skill-card', 100);
    animateGridItems('.project-card', 150);
    animateGridItems('.leadership-card', 120);
    
    // Create initial sparkle burst after page load
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.5
                );
            }, i * 100);
        }
    }, 1000);
});

// Add typing animation for hero text
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            
            // Add sparkle effect while typing
            if (i % 3 === 0) {
                const rect = element.getBoundingClientRect();
                createSparkle(
                    rect.right - 20,
                    rect.top + rect.height / 2
                );
            }
            
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 800);
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    
    if (heroTitle && heroSubtitle) {
        setTimeout(() => {
            typeWriter(heroTitle, 'Riya Verma', 120);
        }, 500);
        
        setTimeout(() => {
            typeWriter(heroSubtitle, 'UI/UX Designer | Aspiring AI/ML Engineer | Creative Technologist', 40);
        }, 2500);
    }
});

// Add constellation effect - connect nearby sparkles
let activeSparkles = [];

function createConstellationEffect() {
    const sparkles = document.querySelectorAll('.sparkle');
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
        opacity: 0.3;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#F8BBD9';
        ctx.lineWidth = 1;
        
        const sparklePositions = Array.from(sparkles).map(sparkle => ({
            x: parseFloat(sparkle.style.left),
            y: parseFloat(sparkle.style.top)
        }));
        
        for (let i = 0; i < sparklePositions.length; i++) {
            for (let j = i + 1; j < sparklePositions.length; j++) {
                const dx = sparklePositions[i].x - sparklePositions[j].x;
                const dy = sparklePositions[i].y - sparklePositions[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    ctx.globalAlpha = (200 - distance) / 200 * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(sparklePositions[i].x, sparklePositions[i].y);
                    ctx.lineTo(sparklePositions[j].x, sparklePositions[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    setInterval(drawConnections, 100);
    
    setTimeout(() => {
        document.body.removeChild(canvas);
    }, 5000);
}

// Trigger constellation effect occasionally
setInterval(() => {
    if (Math.random() < 0.1 && magicActive) {
        createConstellationEffect();
    }
}, 10000);

// Add window resize handler
window.addEventListener('resize', () => {
    // Recreate stars on resize
    const starsContainer = document.querySelector('.stars-container');
    starsContainer.innerHTML = '';
    createStars();
});
