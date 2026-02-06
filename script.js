// Mobile Menu Toggle
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('active');
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      document.getElementById('mainNav').classList.remove('active');
    }
  });
});

// Cart functionality
let cartCount = 0;
function addToCart(button) {
  cartCount++;
  document.querySelector('.cart-count').textContent = cartCount;
  
  // Button animation
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-check"></i> Added!';
  button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
  
  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = 'linear-gradient(45deg, #ff6b00, #ffcc00)';
  }, 2000);
  
  // Show notification
  showNotification('Product added to cart successfully!');
}

// Filter tabs
function filterProducts(category) {
  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent.includes(category) || (category === 'All' && tab.textContent === 'All Products')) {
      tab.classList.add('active');
    }
  });
  
  // Filter products
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    if (category === 'All' || product.getAttribute('data-category') === category) {
      product.style.display = 'block';
      setTimeout(() => {
        product.style.opacity = '1';
        product.style.transform = 'translateY(0)';
      }, 10);
    } else {
      product.style.opacity = '0';
      product.style.transform = 'translateY(30px)';
      setTimeout(() => {
        product.style.display = 'none';
      }, 300);
    }
  });
}

// View category - scroll to tiles or products section
function viewCategory(category) {
  if (category === 'tiles' || category === 'marble') {
    // Scroll to tiles section
    document.querySelector('#tiles').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Scroll to products and filter
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      filterProducts(category);
    }, 800);
  }
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Newsletter subscription
function subscribeNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input').value;
  showNotification('Thank you for subscribing! Check your email for confirmation.');
  event.target.reset();
  return false;
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: linear-gradient(45deg, #4CAF50, #45a049);
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideInRight 0.5s ease;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.product-card, .tile-card, .category-card, .feature-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});
