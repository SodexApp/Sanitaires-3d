
let conversation = [
  { role: "system", content: "Tu es un formateur en nettoyage professionnel." }
];

const stagiaire = "Nom Prenom"; // à adapter dynamiquement si besoin
const zone = "sanitaires";      // à adapter selon le point cliqué

// Lancement manuel ou automatique après clic
function lancerDialogue(initialPrompt) {
  conversation.push({ role: "user", content: initialPrompt });
  sendToGPT();
}

function sendToGPT() {
  fetch("https://gpt-backend-vercel.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: conversation })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erreur HTTP " + res.status);
      return res.json();
    })
    .then(data => {
      const reponse = data.reply || "Je n’ai pas compris.";
      conversation.push({ role: "assistant", content: reponse });

      afficherDansBulle(reponse);
      speechSynthesis.speak(new SpeechSynthesisUtterance(reponse));

      // Enregistrement dans AppSheet via Apps Script
      const derniereUser = conversation.slice(-2)[0].content;
      enregistrerInteraction(derniereUser, reponse);

      // Écouter la réponse orale de l'utilisateur
      attendreRéponseVocale();
    })
    .catch(err => {
      console.error("Erreur GPT :", err);
    });
}

function attendreRéponseVocale() {
  const reco = new webkitSpeechRecognition();
  reco.lang = "fr-FR";
  reco.interimResults = false;
  reco.onresult = event => {
    const reponseUtilisateur = event.results[0][0].transcript;
    conversation.push({ role: "user", content: reponseUtilisateur });
    sendToGPT();
  };
  reco.onerror = e => console.error("Erreur reco vocale :", e);
  reco.start();
}

// Bulle texte 3D simple (adaptable)
function afficherDansBulle(texte) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 256;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.font = '20px sans-serif';
  ctx.fillText(texte, 10, 50);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(3, 1.5, 1);
  sprite.position.copy(camera.position).add(new THREE.Vector3(0, -1, -5));
  scene.add(sprite);
  setTimeout(() => scene.remove(sprite), 10000);
}

// Envoi vers Google Apps Script (lié à AppSheet)
function enregistrerInteraction(question, reponse) {
  fetch("https://script.google.com/macros/s/AKfycbxMKpgja2EZBa2jCofXNRNgaTdYs_C2MSAA7PO_yowRwzgLCL1sl_Bq4JtjcPvtSTK1/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stagiaire: stagiaire,
      zone: zone,
      date: new Date().toISOString(),
      question: question,
      reponse: reponse
    })
  }).catch(e => console.error("Erreur AppSheet log :", e));
}










// APPEL GPT (ASYNCHRONE)

function callBot(index){
    const prompt = `Le stagiaire a cliqué sur le point ${index}. Pose-lui une question pédagogique sur le nettoyage de cette zone.`;

fetch('https://gpt-backend-vercel.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt })
})
.then(res => {
  if (!res.ok) {
    throw new Error("Réponse serveur invalide : " + res.status);
  }
  return res.json();
})
.then(data => {
  console.log("🎧 Réponse GPT :", data);
  const phrase = data.reply || data.text || "Je n’ai pas compris.";
  const voix = new SpeechSynthesisUtterance(phrase);
  voix.lang = "fr-FR";
  speechSynthesis.speak(voix);
})
.catch(err => {
  console.error("Erreur lors de l'appel à GPT :", err);
  const voix = new SpeechSynthesisUtterance("Une erreur est survenue.");
  voix.lang = "fr-FR";
  speechSynthesis.speak(voix);
});
}

