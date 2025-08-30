// Main JavaScript file
import { initializeQuoteSystem } from './js/quote.js';

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('active') && 
      !e.target.closest('.nav-links') && 
      !e.target.closest('.mobile-menu-btn')) {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip empty hash links
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after clicking a link
      if (navLinks?.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  });
});

// Navigation background change on scroll with smooth transition
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    nav.style.boxShadow = 'none';
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease-out';
  observer.observe(section);
});

// EmailJS initialization
(function() {
  emailjs.init("Ue1h_qb7q4iNEANxE");
})();

// Initialize quote system
document.addEventListener('DOMContentLoaded', function() {
  initializeQuoteSystem();
});

console.log('Blue Pool website loaded successfully');