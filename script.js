// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
      const navbar = document.querySelector('.navbar');
      menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-menu-active');
      });
    }
    
    // Modal functionality
    setupModals();
    
    // Authentication steps
    setupAuthSteps();
    
    // Register form
    setupRegisterForm();
  });
  
  function setupModals() {
    // Login link
    const loginLinks = document.querySelectorAll('a[href="#login"]');
    const loginModal = document.getElementById('loginModal');
    
    // Register link
    const registerLinks = document.querySelectorAll('a[href="#register"]');
    const registerModal = document.getElementById('registerModal');
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Open login modal
    if (loginLinks && loginModal) {
      loginLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          loginModal.style.display = 'block';
        });
      });
    }
    
    // Open register modal
    if (registerLinks && registerModal) {
      registerLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          registerModal.style.display = 'block';
        });
      });
    }
    
    // Close modals
    if (closeButtons) {
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          const modal = button.closest('.modal');
          if (modal) {
            modal.style.display = 'none';
          }
        });
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    });
  }
  
  function setupAuthSteps() {
    const nextStepBtn = document.querySelector('.next-step');
    if (!nextStepBtn) return;
    
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    // Show first step
    steps[currentStep].classList.add('active');
    
    // Handle next step button
    nextStepBtn.addEventListener('click', () => {
      // Hide current step
      steps[currentStep].classList.remove('active');
      
      // Move to next step or finish
      currentStep = (currentStep + 1) % steps.length;
      
      // Show new step
      steps[currentStep].classList.add('active');
      
      // Change button text on last step
      if (currentStep === steps.length - 1) {
        nextStepBtn.textContent = 'Finish Authentication';
      } else {
        nextStepBtn.textContent = 'Next Step';
      }
    });
    
    // Authentication simulation buttons
    const scanBtns = document.querySelectorAll('.start-scan, .start-recording, .start-gesture');
    scanBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.disabled = true;
        this.textContent = 'Processing...';
        
        // Simulate authentication (2 seconds)
        setTimeout(() => {
          this.textContent = 'Authentication Successful';
          this.classList.remove('btn-primary');
          this.classList.add('btn-gradient');
          
          // Enable next button
          nextStepBtn.disabled = false;
        }, 2000);
      });
    });
  }
  
  function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // Validate form
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Check if at least 2 authentication methods are selected
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      if (checkboxes.length < 2) {
        alert('Please select at least 2 authentication methods.');
        return;
      }
      
      // Simulate registration
      const submitBtn = registerForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account...';
      
      setTimeout(() => {
        alert('Registration successful! You would now be redirected to set up your biometrics.');
        document.getElementById('registerModal').style.display = 'none';
        registerForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account & Setup Biometrics';
      }, 2000);
    });
  }
  
  // Add scroll animations
  function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .step-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate-in');
      }
    });
  }
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#') && 
          this.getAttribute('href').length > 1) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#login' || targetId === '#register') {
          return; // These are handled by modals
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });