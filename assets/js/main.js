/**
 * Château de Roquetaillade - Script Simple & Léger
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu mobile
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Calculette simple de billets
  const adultInput = document.getElementById('qtyAdults');
  const youthInput = document.getElementById('qtyYouth');
  const totalDisplay = document.getElementById('estimatedTotal');

  if (adultInput && youthInput && totalDisplay) {
    const PRICE_ADULT = 11.50;
    const PRICE_YOUTH = 8.50;

    function calculate() {
      const adults = Math.max(0, parseInt(adultInput.value) || 0);
      const youth = Math.max(0, parseInt(youthInput.value) || 0);
      const total = (adults * PRICE_ADULT) + (youth * PRICE_YOUTH);
      totalDisplay.textContent = total.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    }

    adultInput.addEventListener('input', calculate);
    youthInput.addEventListener('input', calculate);
    calculate();
  }

  // 3. Modal d'agrandissement pour la galerie photo
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImgTag');
  const closeBtn = document.querySelector('.modal-close');

  if (modal && modalImg) {
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const fullSrc = card.getAttribute('data-full-src');
        if (fullSrc) {
          modalImg.src = fullSrc;
          modal.classList.add('active');
        }
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });
  }

  // 4. Formulaire de contact avec accusé clair
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formNotification');
  if (form && alertBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <strong>Merci ${name} !</strong> Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.<br>
        Pour toute question immédiate, n'hésitez pas à nous joindre au <strong>05 56 76 14 16</strong>.
      `;
      form.reset();
    });
  }
});
