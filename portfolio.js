// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero buttons smooth scrolling
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe cards for stagger animation
    const cards = document.querySelectorAll('.card, .skill-category, .project-card, .certification-card, .contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Copy email to clipboard functionality
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                }).catch(() => {
                    // Fallback handled by default mailto behavior
                });
            }
        });
    });

    // Simple notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #3b82f6;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add typing effect to hero title (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Parallax effect for hero background (optional)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg');
        
        if (hero && heroBg) {
            const rate = scrolled * -0.5;
            heroBg.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading class removal
    document.body.classList.add('loaded');
    
    // Skill dots animation
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    try {
                        const dots = entry.target.querySelectorAll('.dot.active');
                        dots.forEach((dot, index) => {
                            setTimeout(() => {
                                dot.style.opacity = '0';
                                dot.style.transform = 'scale(0)';
                                setTimeout(() => {
                                    dot.style.opacity = '1';
                                    dot.style.transform = 'scale(1)';
                                }, 100);
                            }, index * 200);
                        });
                    } catch (err) {
                        console.error('Skill dots animation error:', err);
                    }
                }
            });
        }, observerOptions);

        skillItems.forEach(item => {
            const dots = item.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.style.transition = 'all 0.3s ease';
            });
            skillObserver.observe(item);
        });
    }

    console.log('Portfolio loaded successfully! 🚀');
});