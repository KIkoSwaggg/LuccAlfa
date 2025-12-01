# Sito statico starter — Nome Azienda

Questo repo contiene un semplice sito statico (index.html, styles.css, script.js) pensato per un sito aziendale con:
- pagina "Chi siamo"
- servizi
- sezione "Prenota" con Calendly (iframe)
- form di contatto che usa Formspree (o altro servizio per invio email)

Come pubblicare su GitHub Pages
1. Crea un nuovo repository su GitHub (es. `nome-azienda-site`).  
2. Carica i file `index.html`, `styles.css`, `script.js` nella branch `main`.  
3. Vai su Settings → Pages → Source: scegli branch `main` e cartella `/root`, salva.  
4. Dopo qualche minuto il sito sarà disponibile all'indirizzo `https://<tuo-username>.github.io/<repo>`.

Modificare il contenuto (senza programmazione)
- Puoi modificare direttamente i file nel browser su GitHub: apri `index.html` → Edit (icona matita) → commit changes. Questo aggiornerà il sito.
- Per chi non vuole toccare codice: posso configurare un pannello semplice (Netlify CMS o utilizzare GitHub web editor guidato) così puoi cambiare testi e contatti via form.

Configurare prenotazioni (Calendly)
1. Crea un account su https://calendly.com e imposta la tua disponibilità.  
2. Copia il percorso pubblico, per esempio `calendly.com/tuonome`.  
3. Sostituisci `YOUR_CALENDLY_LINK` nell'`iframe` di `index.html` con il tuo link.

Configurare invio messaggi (Formspree)
1. Vai su https://formspree.io e crea un form; otterrai un endpoint tipo `https://formspree.io/f/XXXXX`.  
2. Sostituisci `https://formspree.io/f/YOUR_FORM_ID` nell'attributo `action` del form in `index.html`.  
3. Testa il form: invia una prova. Formspree invierà la mail a quella configurata.

Se vuoi che lo faccia io (opzioni)
- Posso creare io il repository sul tuo account GitHub e pushare questi file. Per farlo ho bisogno che tu mi dica:
  1) owner del repo (es. il tuo username GitHub). Posso proporre `KIkoSwaggg` come owner se è il tuo username. Vuoi che usi questo?  
  2) nome del repo desiderato (es. `sito-azienda` o `nome-azienda-site`).  
  3) visibilità: `public` o `private` (per GitHub Pages è più semplice usare `public`, ma funziona anche con repo privati se hai piano che lo supporta).  
- Oppure ti guido passo passo mentre lo fai tu (ti do i comandi e i click da eseguire).

Note finali
- Se preferisci non usare Formspree/Calendly posso suggerire alternative (Google Forms + Zapier, TidyCal, ecc.).  
- Se vuoi un piccolo pannello per cambiare testi senza toccare file, posso aggiungere Netlify CMS o una soluzione semplice: fammi sapere.
