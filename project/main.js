import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // --- Hamburger & Nav ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const navbar = document.getElementById('navbar');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.style.boxShadow = window.pageYOffset > 100
        ? '0 4px 30px rgba(0, 0, 0, 0.15)'
        : '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    if (backToTopBtn) {
      window.pageYOffset > 500
        ? backToTopBtn.classList.add('show')
        : backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Fade-in on scroll ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.feature-card, .service-card, .portfolio-btn, .contact-item, .contact-form');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // --- Portfolio Tabs & Gallery ---
  document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const catalogImages = document.querySelectorAll('.catalog-images');
  const viewCatalogBtn = document.getElementById('view-catalog');

  const catalogLinks = {
    mirror: "https://drive.google.com/mirror-catalog-link",
    glass: "https://drive.google.com/glass-catalog-link",
    aluminium: "https://drive.google.com/aluminium-catalog-link"
  };

  // Initialize first tab
  function initPortfolio() {
    const firstTab = tabButtons[0];
    if(firstTab){
      firstTab.classList.add('active');
      showCatalog(firstTab.dataset.catalog);
    }
  }

  // Show catalog function
  function showCatalog(catalog) {
    catalogImages.forEach(div => {
      if(div.id === catalog){
        div.style.display = 'flex';
        div.classList.add('fade-in');
      } else {
        div.style.display = 'none';
        div.classList.remove('fade-in');
      }
    });

    if(viewCatalogBtn && catalogLinks[catalog]){
      viewCatalogBtn.href = catalogLinks[catalog];
      const activeTab = document.querySelector(`.tab-btn[data-catalog="${catalog}"]`);
      viewCatalogBtn.textContent = `View ${activeTab.textContent}`;
    }
  }

  // Tab click
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showCatalog(btn.dataset.catalog);
    });
  });

  // Horizontal scroll: mouse + touch
  catalogImages.forEach(gallery => {
    gallery.addEventListener('wheel', e => {
      e.preventDefault();
      gallery.scrollLeft += e.deltaY;
    });

    let startX;
    gallery.addEventListener('touchstart', e => { startX = e.touches[0].pageX; });
    gallery.addEventListener('touchmove', e => {
      if(!startX) return;
      let deltaX = startX - e.touches[0].pageX;
      gallery.scrollLeft += deltaX;
      startX = e.touches[0].pageX;
    });
  });

  initPortfolio();
});


  // --- Testimonial carousel ---
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('carousel-dots');

  if (testimonialTrack && testimonialCards.length && dotsContainer) {
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
      currentSlide = index;
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);
  }

  // --- Contact form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name && email && message) {
        alert(`Thank you for your message, ${name}! We will get back to you soon at ${email}.`);
        contactForm.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  }
});
