// Fortress of Solitude - Interactive Effects

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.style.getPropertyValue('--progress');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-section');
        observerOptions.observe ? animateOnScroll.observe(section) : null;
        animateOnScroll.observe(section);
    });

    // Parallax effect for background crystals
    document.addEventListener('mousemove', (e) => {
        const crystals = document.querySelectorAll('.crystal');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        crystals.forEach((crystal, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            crystal.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Smooth scroll for navigation links (excluding project links)
    document.querySelectorAll('a[href^="#"]:not(.project-link)').forEach(anchor => {
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

    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalClose = document.getElementById('modalClose');

    const modalContent = {
        store: {
            icon: '📱',
            title: 'NOT_AVAILABLE',
            message: 'This app is no longer available on the App Store or Google Play.'
        },
        source: {
            icon: '🔒',
            title: 'PRIVATE_REPOSITORY',
            message: 'This source code is stored in a private repository and is not available for public viewing.'
        },
        demo: {
            icon: '🚧',
            title: 'COMING_SOON',
            message: 'This project demo is currently in development and will be available soon.'
        }
    };

    if (modal && modalClose) {
        // Handle project link clicks
        document.querySelectorAll('.project-link[href="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const type = this.getAttribute('data-type');
                const content = modalContent[type];
                
                if (content) {
                    modalIcon.textContent = content.icon;
                    modalTitle.textContent = content.title;
                    modalMessage.textContent = content.message;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navigation background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(3, 7, 18, 0.95)';
        } else {
            nav.style.background = 'linear-gradient(180deg, rgba(3, 7, 18, 0.9) 0%, transparent 100%)';
        }

        lastScroll = currentScroll;
    });

    // Add glitch effect to name on hover
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.addEventListener('mouseenter', () => {
            heroName.classList.add('glitch');
            setTimeout(() => heroName.classList.remove('glitch'), 500);
        });
    }

    // Typing effect for hero title (optional enhancement)
    const addTypingCursor = () => {
        const title = document.querySelector('.hero-title h2');
        if (title) {
            title.innerHTML += '<span class="cursor">|</span>';
        }
    };

    // Initialize skill bars at 0 width
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const targetWidth = bar.style.getPropertyValue('--progress');
        bar.style.setProperty('--target-progress', targetWidth);
        bar.style.width = '0';
    });
});

// Add CSS for animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-progress {
        transition: width 1s ease-out;
    }
    
    .glitch {
        animation: glitch 0.5s ease;
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    .cursor {
        animation: blink 1s infinite;
        color: var(--crystal-primary);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);
