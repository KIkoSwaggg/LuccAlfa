// script.js - rimuove _next, invia via fetch, manda evento GA e redirect
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  if (!form) return;
  const endpoint = form.getAttribute('action'); // https://formspree.io/f/xjknrvqv

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const f = this;

    try {
      // costruisci FormData e rimuovi _next se presente
      const fm = new FormData(f);
      if (fm.has('_next')) {
        fm.delete('_next');
        console.log('Rimosso campo _next dalla form data');
      }

      // debug: view values sent
      const entries = Array.from(fm.entries());
      console.log('Form data inviata:', entries);

      // serialize
      const body = new URLSearchParams(entries).toString();

      // invia a Formspree
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
        credentials: 'include'
      });

      if (res.ok) {
        console.log('Formspree OK, invio evento GA');
        if (typeof gtag === 'function') {
          gtag('event', 'contact_form_submit', {
            'send_to': 'G-0WRW6ZJJ88',
            'event_category': 'engagement',
            'event_label': 'Contact form',
            'event_callback': function(){ window.location = '/LuccAlfa/thanks.html'; }
          });
          // fallback redirect
          setTimeout(()=>{ window.location = '/LuccAlfa/thanks.html'; }, 1500);
        } else {
          window.location = '/LuccAlfa/thanks.html';
        }
      } else {
        console.error('Formspree errore', res.status, await res.text());
        alert('Errore invio, riprova più tardi.');
      }
    } catch (err) {
      console.error('Errore invio form', err);
      f.submit();
    }
  });
})();
