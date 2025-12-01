// script.js - gestione submit form + anno dinamico (sostituisci G-XXXXXXX con il tuo Measurement ID)
document.getElementById('year')?.textContent = new Date().getFullYear();

(function(){
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    // invia evento GA4 prima di sottomettere il form a Formspree
    if (typeof gtag === 'function') {
      gtag('event', 'contact_form_submit', {
        'send_to': 'G-0WRW6ZJJ88', // <-- sostituisci qui
        'event_category': 'engagement',
        'event_label': 'Contact form',
        'event_callback': function(){ form.submit(); }
      });
      // fallback per sicurezza
      setTimeout(()=>form.submit(), 1500);
    } else {
      form.submit();
    }
  });
})();
