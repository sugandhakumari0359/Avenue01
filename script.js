// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Service card hover effects
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) translateZ(20px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) translateZ(0)';
    });
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Initialize labels based on content
    if (input.value !== '') {
        input.nextElementSibling.style.top = '-0.6rem';
        input.nextElementSibling.style.fontSize = '0.85rem';
        input.nextElementSibling.style.color = 'var(--rose-gold)';
    }
    
    input.addEventListener('focus', () => {
        input.nextElementSibling.style.top = '-0.6rem';
        input.nextElementSibling.style.fontSize = '0.85rem';
        input.nextElementSibling.style.color = 'var(--rose-gold)';
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.nextElementSibling.style.top = '1.2rem';
            input.nextElementSibling.style.fontSize = '1rem';
            input.nextElementSibling.style.color = '#999';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Mouse move parallax effect
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return; // Exit if hero element is not found

    // Get the bounding rectangle of the hero section
    const rect = hero.getBoundingClientRect();

    // Calculate the center of the hero section relative to the viewport
    const heroCenterX = rect.left + rect.width / 2;
    const heroCenterY = rect.top + rect.height / 2;

    // Calculate the mouse position relative to the center of the hero section
    const mouseXRelativeToHero = e.clientX - heroCenterX;
    const mouseYRelativeToHero = e.clientY - heroCenterY;

    // Apply the parallax effect based on the mouse position relative to the hero
    // Adjust the divisor (e.g., 25) to control the intensity of the parallax
    const xAxis = mouseXRelativeToHero / 25;
    const yAxis = mouseYRelativeToHero / 25;

    hero.style.transform = `translate3d(${xAxis}px, ${yAxis}px, 0)`;
});



document.addEventListener('DOMContentLoaded',()=>{
    const carouselImages = document.querySelector('.carousel-images');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dots = document.querySelectorAll('.dot');
    const totalImages = dots.length;
    let currentIndex = 0;
    let autoScrollInterval; // Variable to hold the interval ID
    
    // Function to update the carousel display (same as before)
    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselImages.style.transform = `translateX(${offset}%)`;
    
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }
    
    // Function to advance to the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }
    
    // Function to start the auto-scrolling
    function startAutoScroll() {
      // Set an interval to call nextSlide() every 3000ms (3 seconds)
      autoScrollInterval = setInterval(nextSlide, 3000);
    }
    
    // Function to stop the auto-scrolling
    function stopAutoScroll() {
      // Clear the interval to stop the automatic rotation
      clearInterval(autoScrollInterval);
    }
    
    // Event listeners for the "Next" and "Previous" buttons
    // We will also stop the auto-scroll when a user manually interacts with the carousel
    nextButton.addEventListener('click', () => {
      stopAutoScroll();
      nextSlide();
      startAutoScroll(); // Restart the auto-scroll after a manual click
    });
    
    prevButton.addEventListener('click', () => {
      stopAutoScroll();
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
      startAutoScroll(); // Restart the auto-scroll after a manual click
    });
    
    // Event listeners for the dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoScroll();
        currentIndex = index;
        updateCarousel();
        startAutoScroll(); // Restart the auto-scroll after a manual click
      });
    });
    
    // Optional: Pause auto-scroll on hover
    // This is a good user experience feature to allow users to read content
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);
    
    // Initialize the carousel on page load and start the auto-scroll
    updateCarousel();
    startAutoScroll();
})
