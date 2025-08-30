// Quote popup functionality
export function initializeQuoteSystem() {
  const quoteButtons = document.querySelectorAll('.cta-button');
  const quotePopup = createQuotePopup();
  
  document.body.appendChild(quotePopup);

  // Open popup when clicking CTA buttons
  quoteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      quotePopup.classList.add('active');
    });
  });

  // Close popup
  const closeButton = quotePopup.querySelector('.close-popup');
  closeButton.addEventListener('click', () => {
    quotePopup.classList.remove('active');
  });

  // Close popup when clicking outside
  quotePopup.addEventListener('click', function(e) {
    if (e.target === quotePopup) {
      quotePopup.classList.remove('active');
    }
  });

  // Initialize form functionality
  initializeQuoteForm(quotePopup);
}

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