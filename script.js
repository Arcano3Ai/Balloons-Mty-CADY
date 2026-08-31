/* ==========================================================================
   BALLOONS MTY CADY — INTERACTIVE SCRIPTS
   Designed for Damariss Huerta | Monterrey, N.L.
   "Creamos momentos que se quedan contigo"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeaderScroll();
  initMobileMenu();
  initHeroCanvas();
  initAudioPlayer();
  initVideoPlayer();
  initBeforeAfterSlider();
  initPortfolioFilter();
  initLightboxModal();
  initInteractiveConfigurator();
  initQuoteFormWhatsApp();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Header Scroll Effect
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Ambient Music Player Toggle (Official Track: Balloons MTY CADY.wav)
   -------------------------------------------------------------------------- */
function initAudioPlayer() {
  const audioBtn = document.getElementById('audioToggleBtn');
  const audio = document.getElementById('ambientAudio');

  if (!audioBtn || !audio) return;

  let isPlaying = false;

  audioBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        audioBtn.classList.add('playing');
        audioBtn.querySelector('.audio-label').textContent = 'DESACTIVAR MÚSICA';
      }).catch(err => {
        console.log('Audio playback prevented by browser policy:', err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      audioBtn.classList.remove('playing');
      audioBtn.querySelector('.audio-label').textContent = 'MÚSICA AMBIENTE';
    }
  });

  // Optional user gesture trigger for ambient music
  const enableAudioOnFirstTouch = () => {
    document.removeEventListener('click', enableAudioOnFirstTouch);
    document.removeEventListener('touchstart', enableAudioOnFirstTouch);
  };
  document.addEventListener('click', enableAudioOnFirstTouch, { once: true });
  document.addEventListener('touchstart', enableAudioOnFirstTouch, { once: true });
}

/* --------------------------------------------------------------------------
   4. Official Video Showreel Player Overlay
   -------------------------------------------------------------------------- */
function initVideoPlayer() {
  const playOverlay = document.getElementById('videoPlayBtn');
  const video = document.getElementById('mainShowreelVideo');

  if (!playOverlay || !video) return;

  playOverlay.addEventListener('click', () => {
    playOverlay.classList.add('playing');
    video.muted = false;
    video.play();
  });

  video.addEventListener('pause', () => {
    playOverlay.classList.remove('playing');
  });
}

/* --------------------------------------------------------------------------
   5. Floating 3D Ambient Balloons Hero Canvas
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Particle / Floating Balloon constructor
  class BalloonParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 200;
      this.radius = Math.random() * 25 + 10;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;

      // Color choices: Magenta, Purple, Gold metallic, Clear sparkle
      const colorType = Math.random();
      if (colorType < 0.35) {
        this.color = '255, 0, 127'; // Neon Magenta
      } else if (colorType < 0.65) {
        this.color = '138, 43, 226'; // Electric Purple
      } else if (colorType < 0.85) {
        this.color = '212, 175, 55'; // Metallic Gold
      } else {
        this.color = '255, 255, 255'; // Glossy White/Confetti
      }
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.5;

      if (this.y < -50) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      
      // Radial glow gradient for glossy balloon look
      const grad = ctx.createRadialGradient(
        this.x - this.radius * 0.3,
        this.y - this.radius * 0.3,
        this.radius * 0.1,
        this.x,
        this.y,
        this.radius
      );
      grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.3})`);
      grad.addColorStop(0.4, `rgba(${this.color}, ${this.opacity})`);
      grad.addColorStop(1, `rgba(${this.color}, 0.05)`);

      ctx.fillStyle = grad;
      ctx.fill();

      // Shiny glare spot
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.35, this.y - this.radius * 0.35, this.radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.4})`;
      ctx.fill();

      ctx.restore();
    }
  }

  // Create 35 floating balloons
  for (let i = 0; i < 35; i++) {
    const p = new BalloonParticle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   6. Interactive Before / After Draggable Comparison Slider (Pixel-Perfect)
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('baContainer');
  const beforeWrap = document.getElementById('baBeforeWrap');
  const beforeImg = document.getElementById('baBeforeImg');
  const handle = document.getElementById('baHandle');

  if (!container || !beforeWrap || !handle) return;

  let isDragging = false;

  // Responsive width adjustment for inner before image
  function syncBeforeImgWidth() {
    if (beforeImg) {
      beforeImg.style.width = `${container.offsetWidth}px`;
    }
  }

  window.addEventListener('resize', syncBeforeImgWidth);
  syncBeforeImgWidth();

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    beforeWrap.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch events for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  });
}

/* --------------------------------------------------------------------------
   7. Portfolio Filtering & Lightbox Modal
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function initLightboxModal() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCat = document.getElementById('lightboxCategory');
  const closeBtn = document.getElementById('lightboxClose');
  const modalCta = document.getElementById('lightboxCta');

  if (!modal) return;

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.portfolio-img').src;
      const title = item.querySelector('.portfolio-name').textContent;
      const cat = item.querySelector('.portfolio-cat').textContent;

      modalImg.src = img;
      modalTitle.textContent = title;
      modalCat.textContent = cat;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (modalCta) {
    modalCta.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   8. Interactive Event Visual Configurator
   -------------------------------------------------------------------------- */
function initInteractiveConfigurator() {
  const configOpts = document.querySelectorAll('.config-opt');
  const summaryBtn = document.getElementById('configBuildBtn');

  const selectedState = {
    eventType: 'Cumpleaños',
    palette: 'Midnight Gold (Negro, Dorado & Plata)',
    style: 'Arco Orgánico Premium',
    scale: 'Mediano (2 a 4 metros)',
    budget: '$5,000 - $10,000 MXN'
  };

  configOpts.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const parentGroup = opt.closest('.config-step-group');
      parentGroup.querySelectorAll('.config-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');

      const groupType = parentGroup.getAttribute('data-group');
      const val = opt.getAttribute('data-value');
      selectedState[groupType] = val;
    });
  });

  if (summaryBtn) {
    summaryBtn.addEventListener('click', () => {
      // Pre-fill form fields in Section 09
      const selectEvent = document.getElementById('qEventType');
      const selectBudget = document.getElementById('qBudget');
      const messageField = document.getElementById('qMessage');

      if (selectEvent) selectEvent.value = selectedState.eventType;
      if (selectBudget) selectBudget.value = selectedState.budget;

      if (messageField) {
        messageField.value = `¡Hola! Me gustaría cotizar con la siguiente configuración personalizada:\n` +
          `• Evento: ${selectedState.eventType}\n` +
          `• Paleta de Colores: ${selectedState.palette}\n` +
          `• Estilo: ${selectedState.style}\n` +
          `• Tamaño del Espacio: ${selectedState.scale}\n` +
          `• Presupuesto Estimado: ${selectedState.budget}`;
      }

      // Smooth scroll to Section 09
      const quoteSection = document.getElementById('cotizacion');
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   9. Quote Form & Automated WhatsApp Message Builder
   -------------------------------------------------------------------------- */
function initQuoteFormWhatsApp() {
  const form = document.getElementById('quoteForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('qName').value.trim();
    const phone = document.getElementById('qPhone').value.trim();
    const eventType = document.getElementById('qEventType').value;
    const date = document.getElementById('qDate').value;
    const location = document.getElementById('qLocation').value.trim();
    const guests = document.getElementById('qGuests').value;
    const decorType = document.getElementById('qDecorType').value;
    const budget = document.getElementById('qBudget').value;
    const message = document.getElementById('qMessage').value.trim();

    if (!name || !phone) {
      alert('Por favor completa al menos tu Nombre y WhatsApp para ponernos en contacto.');
      return;
    }

    // Structured message template for WhatsApp
    const waText = 
`✨ *NUEVA SOLICITUD DE COTIZACIÓN - BALLOONS MTY CADY* ✨
-----------------------------------------
👤 *Cliente:* ${name}
📱 *WhatsApp:* ${phone}
🎉 *Evento:* ${eventType}
📅 *Fecha:* ${date || 'Por definir'}
📍 *Ubicación:* ${location || 'Monterrey N.L.'}
👥 *Invitados Aprox:* ${guests || 'No especificado'}
🎈 *Tipo de Decoración:* ${decorType || 'Personalizada'}
💰 *Presupuesto Aprox:* ${budget || 'Por cotizar'}

📝 *Mensaje / Detalles:*
${message || 'Sin mensaje adicional.'}

-----------------------------------------
Enviado desde el sitio web oficial.`;

    const encodedMsg = encodeURIComponent(waText);
    const waNumber = '528118671408'; // Official contact number format for Monterrey
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
  });
}

/* --------------------------------------------------------------------------
   10. Scroll Reveal Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .exp-card, .service-card, .process-step, .testi-card, .config-box, .form-box, .video-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Inject helper CSS class dynamically
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}
