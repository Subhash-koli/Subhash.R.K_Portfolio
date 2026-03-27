/* ── Loading Screen ── */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }
    }, 2000); // 2 second loading animation
});

/* ── Mobile Navigation ── */
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

/* ── Scroll to Top Button ── */
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
});

// Scroll to top when button is clicked
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ── Dark Mode Toggle ── */
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

/* ── Project Filtering ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.proj');

if (filterBtns.length > 0 && projects.length > 0) {
    // Add data categories to projects (you'll need to add these in HTML)
    const projectCategories = [
        'bi', // Project 1 - BI / Analytics
        'ml', // Project 2 - ML Risk Prediction
        'web', // Project 3 - Khwaish Platform
        'research' // Project 4 - Avishkar Research
    ];
    
    projects.forEach((project, index) => {
        if (projectCategories[index]) {
            project.setAttribute('data-category', projectCategories[index]);
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'grid';
                    project.style.animation = 'fadeUp 0.5s ease both';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

/* ── Scroll Progress Indicator ── */
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrollProgress + '%';
    }
});

/* ── Cursor ── */
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
});

(function anim() {
    rx += (mx - rx) * .13;
    ry += (my - ry) * .13;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(anim);
})();

document.querySelectorAll('a,button,.skill-card,.proj,.ach-card,.cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ── Scroll Reveal ── */
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
        }
    });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── Active Nav ── */
const sections = document.querySelectorAll('section[id],div[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const id = e.target.getAttribute('id');
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
        }
    });
}, { threshold: .4 });

sections.forEach(s => navObs.observe(s));

/* ── Bar grow on scroll ── */
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.pfill,.mr-fill').forEach(b => {
                b.style.animationPlayState = 'running';
            });
        }
    });
}, { threshold: .2 });

document.querySelectorAll('.prof-left,.dash-body').forEach(el => barObs.observe(el));

/* ── Counter animation ── */
function animCount(el, end, duration = 1500) {
    let start = 0;
    const step = end / 60;
    const timer = setInterval(() => {
        start += step;
        if (start >= end) {
            start = end;
            clearInterval(timer);
        }
        el.textContent = Number.isInteger(end) ? Math.floor(start).toLocaleString() : start.toFixed(1);
    }, duration / 60);
}

const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.ds-val').forEach(el => {
                const raw = el.textContent.replace(/[^0-9.]/g, '');
                const val = parseFloat(raw);
                if (!isNaN(val)) {
                    animCount(el, val);
                }
            });
            countObs.unobserve(e.target);
        }
    });
}, { threshold: .4 });

document.querySelectorAll('.dash-stats').forEach(el => countObs.observe(el));

/* ── Experience Navigation ── */
const expNavItems = document.querySelectorAll('.exp-nav-item');
const expCards = document.querySelectorAll('.exp-card');

expNavItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        expNavItems.forEach(navItem => navItem.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Scroll to corresponding experience card
        expCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

/* ── Smooth scroll for navigation links ── */
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

/* ── Add some interactive hover effects ── */
document.querySelectorAll('.skill-card, .cert-card, .ach-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ── Project card interactions ── */
document.querySelectorAll('.proj').forEach(proj => {
    proj.addEventListener('mouseenter', function() {
        this.querySelector('.pj-link').style.transform = 'translateX(8px)';
    });
    
    proj.addEventListener('mouseleave', function() {
        this.querySelector('.pj-link').style.transform = 'translateX(4px)';
    });
});

/* ── Contact form interactions (if needed in future) ── */
document.querySelectorAll('.c-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add a subtle animation to clicked contact links
        this.style.transform = 'translateX(12px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

/* ── Performance optimization: Pause animations when not visible ── */
let animationPaused = false;

const visibilityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && !animationPaused) {
            // Pause animations when section is not visible
            document.querySelectorAll('.float-badge, .ticker-track').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
            animationPaused = true;
        } else if (entry.isIntersecting && animationPaused) {
            // Resume animations when section becomes visible
            document.querySelectorAll('.float-badge, .ticker-track').forEach(el => {
                el.style.animationPlayState = 'running';
            });
            animationPaused = false;
        }
    });
}, { threshold: 0.1 });

// Observe main sections for visibility
document.querySelectorAll('section').forEach(section => {
    visibilityObserver.observe(section);
});

/* ── Initialize page ── */
document.addEventListener('DOMContentLoaded', function() {
    // Add initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Add smooth reveal animation for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn-main, .btn-out, .btn-resume, .cta-btn, .cta-btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    /* ── Performance Optimizations ── */
// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events with debouncing
const debouncedScroll = debounce(() => {
    // Scroll progress indicator
    if (scrollProgressBar) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = scrollProgress + '%';
    }
    
    // Scroll to top button visibility
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
}, 10);

// Use debounced scroll event
window.addEventListener('scroll', debouncedScroll, { passive: true });

// Lazy loading for images (if any are added later)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

// Observe all lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

});  // Closing brace for DOMContentLoaded

/* ── Certificate Modal ── */
const certModal = document.getElementById('certModal');
const certModalTitle = document.getElementById('certModalTitle');
const certModalImg = document.getElementById('certModalImg');
const certModalDownload = document.getElementById('certModalDownload');

// Certificate mapping - add your certificate images to assets/certs/ folder
const certImages = {
    'tcs-data-viz': 'assets/certs/tcs-data-viz.png',
    'livewire-ds': 'assets/certs/livewire-ds.png',
    'livewire-powerbi': 'assets/certs/livewire-powerbi.png',
    'niit-dm': 'assets/certs/niit-dm.png',
    'henry-english': 'assets/certs/henry-english.png',
    'snap-ar': 'assets/certs/snap-ar.png'
};

const certNames = {
    'tcs-data-viz': 'Data Visualisation - TCS Forage',
    'livewire-ds': 'Data Science & Data Engineering',
    'livewire-powerbi': 'Data Analytics using Power BI',
    'niit-dm': 'Digital Marketing & Graphics',
    'henry-english': 'English Language Proficiency',
    'snap-ar': 'AR Lens Challenge Hackathon'
};

function openCertModal(card) {
    const certKey = card.getAttribute('data-cert');
    const imgPath = certImages[certKey] || 'assets/certs/placeholder.png';
    const certName = certNames[certKey] || 'Certificate';
    
    certModalTitle.textContent = certName;
    certModalImg.src = imgPath;
    certModalImg.alt = certName;
    certModalDownload.href = imgPath;
    certModalDownload.download = `${certKey}-certificate.png`;
    
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
    certModalImg.src = '';
}

// Close modal on outside click
certModal.addEventListener('click', function(e) {
    if (e.target === certModal) {
        closeCertModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeCertModal();
    }
});

// Log that the portfolio is ready
console.log('🚀 Subhash Koli Portfolio - Ready to impress!');

/* ── Particle Effect ── */
function createParticles() {
    const particleBg = document.getElementById('particle-bg');
    if (!particleBg) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
        
        particleBg.appendChild(particle);
    }
}

/* ── Magnetic Button Effect ── */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/* ── Initialize Effects ── */
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initMagneticButtons();
    
    // Add magnetic class to main buttons
    const mainButtons = document.querySelectorAll('.btn-main, .nav-cta');
    mainButtons.forEach(btn => btn.classList.add('magnetic-btn'));
});

/* ── Contact Form ── */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            // For demo purposes, we'll just show success
            showFormStatus('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // In a real implementation, you would send the data to your backend
            // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message }) });
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type} show`;
        
        // Hide after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 5000);
    }
}

/* ── Social Share Modal ── */
const shareTwitterBtn = document.getElementById('share-twitter');
const shareModal = document.getElementById('share-modal');
const closeShareModalBtn = document.getElementById('close-share-modal');
const copyLinkBtn = document.getElementById('copy-link');

if (shareTwitterBtn && shareModal) {
    shareTwitterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        shareModal.classList.add('active');
    });
}

if (closeShareModalBtn) {
    closeShareModalBtn.addEventListener('click', () => {
        shareModal.classList.remove('active');
    });
}

// Close modal when clicking outside
shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.classList.remove('active');
    }
});

// Copy link functionality
if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
        const url = window.location.href;
        
        try {
            await navigator.clipboard.writeText(url);
            
            // Show success feedback
            const originalText = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
            copyLinkBtn.style.background = 'var(--green-lt)';
            copyLinkBtn.style.borderColor = 'var(--green)';
            
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalText;
                copyLinkBtn.style.background = '';
                copyLinkBtn.style.borderColor = '';
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Show success feedback
            const originalText = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
            
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalText;
            }, 2000);
        }
    });
}  // Closing brace for if (copyLinkBtn) statement

// End of script - portfolio ready
