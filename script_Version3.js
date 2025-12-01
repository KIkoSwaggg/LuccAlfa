// Piccolo script: anno dinamico e conferma invio form
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
form?.addEventListener('submit', e=>{
  // Lascia che Formspree gestisca l'invio; qui mostriamo un messaggio di conferma rapido
  setTimeout(()=>alert('Grazie! Il messaggio è stato inviato.'), 200);
});