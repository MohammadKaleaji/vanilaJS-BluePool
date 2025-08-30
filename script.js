// Main JavaScript file
console.log('Script loaded');

// Import the quote system functionality directly
function createQuotePopup() {
  const popup = document.createElement('div');
  popup.className = 'quote-popup';
  
  popup.innerHTML = `
    <div class="quote-form">
      <button class="close-popup">&times;</button>
      <h2>Get Your Free Quote</h2>
      <form id="quoteForm">
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" name="address" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Pool Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="poolSize">Pool Size (in sq ft)</label>
              <input type="number" id="poolSize" name="poolSize" required>
            </div>
            <div class="form-group">
              <label for="poolType">Pool Type</label>
              <select id="poolType" name="poolType" required>
                <option value="">Select type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div class="form-group">
              <label for="serviceType">Service Type</label>
              <select id="serviceType" name="serviceType" required>
                <option value="">Select service</option>
                <option value="complete">Complete Care</option>
                <option value="super">Super Care</option>
              </select>
            </div>
            <div class="form-group">
              <label for="frequency">Service Frequency</label>
              <select id="frequency" name="frequency" required>
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="notes">Additional Notes</label>
          <textarea id="notes" name="notes" rows="3"></textarea>
        </div>

        <div class="price-estimate">
          <h3>Estimated Monthly Price</h3>
          <div class="price">$<span id="estimatedPrice">0</span></div>
          <p>*Final price may vary based on inspection</p>
        </div>

        <button type="submit" class="quote-submit">Get Quote</button>
      </form>
    </div>
  `;

  return popup;
}

function initializeQuoteForm(quotePopup) {
  const quoteForm = quotePopup.querySelector('#quoteForm');
  
  // Calculate estimated price
  const calculatePrice = () => {
    const poolSize = Number(document.getElementById('poolSize').value) || 0;
    const serviceType = document.getElementById('serviceType').value;
    const frequency = document.getElementById('frequency').value;

    let basePrice = 0;
    
    if (poolSize > 0) {
      basePrice = poolSize * 0.5; // $0.50 per sq ft
      
      // Service type multiplier
      if (serviceType === 'super') {
        basePrice *= 1.5; // 50% more for super care
      }
      
      // Frequency multiplier
      switch (frequency) {
        case 'weekly':
          basePrice *= 4;
          break;
        case 'biweekly':
          basePrice *= 2;
          break;
        case 'monthly':
          break;
      }
      
      const priceEstimate = quotePopup.querySelector('.price-estimate');
      const estimatedPrice = document.getElementById('estimatedPrice');
      
      estimatedPrice.textContent = Math.round(basePrice);
      priceEstimate.classList.add('active');
    }
  };

  // Update price when form fields change
  ['poolSize', 'serviceType', 'frequency'].forEach(fieldId => {
    quoteForm.querySelector(`#${fieldId}`).addEventListener('change', calculatePrice);
  });

  // Handle form submission
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      poolSize: document.getElementById('poolSize').value,
      poolType: document.getElementById('poolType').value,
      serviceType: document.getElementById('serviceType').value,
      frequency: document.getElementById('frequency').value,
      notes: document.getElementById('notes').value,
      estimatedPrice: document.getElementById('estimatedPrice').textContent
    };

    // Send email using EmailJS
    emailjs.send(
      'service_nuyzy9d',
      'template_m5nzokj',
      formData
    ).then(
      function(response) {
        alert('Quote request sent successfully! We will contact you soon.');
        quotePopup.classList.remove('active');
        quoteForm.reset();
      },
      function(error) {
        alert('Failed to send quote request. Please try again.');
      }
    );
  });
}

function initializeQuoteSystem() {
  console.log('Initializing quote system...');
  
  const quoteButtons = document.querySelectorAll('.cta-button');
  console.log('Found quote buttons:', quoteButtons.length);
  
  if (quoteButtons.length === 0) {
    console.error('No CTA buttons found!');
    return;
  }
  
  const quotePopup = createQuotePopup();
  console.log('Quote popup created:', quotePopup);
  
  document.body.appendChild(quotePopup);
  console.log('Quote popup added to body');

  // Open popup when clicking CTA buttons
  quoteButtons.forEach((button, index) => {
    console.log(`Adding click listener to button ${index + 1}`);
    button.addEventListener('click', function(e) {
      console.log('CTA button clicked!');
      e.preventDefault();
      quotePopup.classList.add('active');
      console.log('Popup should now be visible');
    });
  });

  // Close popup
  const closeButton = quotePopup.querySelector('.close-popup');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      console.log('Close button clicked');
      quotePopup.classList.remove('active');
    });
  }

  // Close popup when clicking outside
  quotePopup.addEventListener('click', function(e) {
    if (e.target === quotePopup) {
      console.log('Clicked outside popup, closing');
      quotePopup.classList.remove('active');
    }
  });

  // Initialize form functionality
  initializeQuoteForm(quotePopup);
  
  console.log('Quote system initialization complete');
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  // Initialize quote system
  initializeQuoteSystem();
  
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

  // Smooth scrolling for navigation links (exclude quote buttons)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#quote') return; // Skip empty hash links and quote links
      
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

  // Navigation background change on scroll
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
});

// EmailJS initialization
(function() {
  emailjs.init("Ue1h_qb7q4iNEANxE");
})();

console.log('Script setup complete');