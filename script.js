// script.js - rimuove _next dal DOM, invia via fetch (senza credentials), manda evento GA e redirect
(function(){
  console.log('[script.js] script caricato');

  // rimuovi eventuale input _next nel DOM (fix difensivo)
  const initialNext = document.querySelector('input[name="_next"]');
  if (initialNext) {
    initialNext.remove();
    console.log('[script.js] _next rimosso dal DOM (init)');
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  if (!form) {
    console.log('[script.js] contact-form non trovato');
    return;
  }
  console.log('[script.js] contact-form trovato, attacco submit listener');

  const endpoint = form.getAttribute('action');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const f = this;

    try {
      // se per qualche motivo c'è ancora un _next nel DOM, rimuovilo ora (prima di costruire FormData)
      const domNext = f.querySelector('input[name="_next"]');
      if (domNext) {
        domNext.remove();
        console.log('[script.js] _next rimosso dal DOM (on submit)');
      }

      // costruisci FormData senza _next
      const fm = new FormData(f);
      if (fm.has('_next')) {
        fm.delete('_next');
        console.log('[script.js] _next cancellato da FormData');
      }

      const entries = Array.from(fm.entries());
      console.log('[script.js] Form data inviata:', entries);

      const body = new URLSearchParams(entries).toString();

      // invia a Formspree senza credentials (evita problemi CORS con Access-Control-Allow-Credentials)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
        mode: 'cors'
        // non impostare credentials: 'include' -> evitiamo il requisito Access-Control-Allow-Credentials:true
      });

      if (res.ok) {
        console.log('[script.js] Formspree OK, invio evento GA');
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
        console.error('[script.js] Formspree errore', res.status, await res.text());
        alert('Errore invio, riprova più tardi. Se il problema persiste contattami.');
        // non forzare submit classico: evitiamo il redirect verso formspree che esegue tag esterni
      }
    } catch (err) {
      console.error('[script.js] Errore invio form', err);

      // Tentativo difensivo: rimuoviamo eventuale _next nel DOM prima di qualsiasi fallback submit
      const domNextFallback = f.querySelector('input[name="_next"]');
      if (domNextFallback) {
        domNextFallback.remove();
        console.log('[script.js] _next rimosso dal DOM (fallback)');
      }

      // come ultima risorsa: submit tradizionale per garantire consegna (attenzione: potrebbe ancora navigare)
      try {
        console.log('[script.js] fallback: submit tradizionale');
        f.submit();
      } catch (e) {
        console.error('[script.js] fallback submit fallito', e);
        alert('Invio fallito. Riprova più tardi.');
      }
    }
  });
})();
