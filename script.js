/*!
 * script.js
 * Version: 2025-12-02
 * Purpose: handle contact form (fetch to Formspree), push GA event, redirect to local thanks page
 */

(function(){
  // Defensive removal of any _next hidden field
  try {
    const initialNext = document.querySelector('input[name="_next"]');
    if (initialNext) initialNext.remove();
  } catch (e) {
    console.error('[script.js] failed to remove initial _next field', e);
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  if (!form) return;

  const endpoint = form.getAttribute('data-endpoint') || form.getAttribute('action');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const f = this;

    try {
      const domNext = f.querySelector('input[name="_next"]');
      if (domNext) domNext.remove();

      const fm = new FormData(f);
      if (fm.has('_next')) fm.delete('_next');

      const entries = Array.from(fm.entries());
      const body = new URLSearchParams(entries).toString();

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: body,
        mode: 'cors'
      });

      if (res.ok) {
        try { await res.json().catch(()=>{}); } catch(e){ /* ignore */ }

        // GA dataLayer push
        window.dataLayer = window.dataLayer || [];
        const gaEvent = {
          event: 'contact_form_submit',
          send_to: 'G-0WRW6ZJJ88',
          event_category: 'engagement',
          event_label: 'Contact form'
        };
        try { window.dataLayer.push(gaEvent); } catch(e){ /* ignore */ }

        // call gtag if present (best-effort)
        if (typeof gtag === 'function') {
          try { gtag('event', 'contact_form_submit', { 'send_to': 'G-0WRW6ZJJ88' }); } catch(e){ /* ignore */ }
        }

        // fallback redirect after short delay
        setTimeout(()=>{ window.location = '/LuccAlfa/thanks.html'; }, 3000);
      } else {
        const text = await res.text().catch(()=>'');
        console.error('[script.js] Formspree error', res.status, text);
        alert('Si è verificato un errore nell\'invio. Riprova più tardi.');
      }
    } catch (err) {
      console.error('[script.js] Submission error', err);
      alert('Invio fallito a causa di un problema di rete. Riprova.');
    }
  });
})();
