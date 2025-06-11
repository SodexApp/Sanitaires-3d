// ------------------------------
// 🔁 Conversation de départ
// ------------------------------
let conversation = [
  { role: "system", content: "Tu es un formateur en nettoyage professionnel. Pose une première question adaptée à la zone ciblée." }
];

let stagiaire = "Nom Prénom";   // À adapter depuis AppSheet
let zone = "sanitaires";        // À adapter selon le point cliqué

let lastQuestionFromGPT = "";   // Pour stocker la dernière question posée

// ------------------------------
// 🚀 Lancement initial
// ------------------------------
function lancerDialogue() {
  sendToGPT(); // GPT initie la conversation
}

// ------------------------------
// 🤖 Envoi à GPT via ton backend
// ------------------------------
function sendToGPT() {
  fetch("https://gpt-backend-vercel.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: conversation })
  })
    .then(res => res.json())
    .then(data => {
      const reponse = data.reply || "Je n’ai pas compris.";
      conversation.push({ role: "assistant", content: reponse });

      lastQuestionFromGPT = reponse;

      afficherDansBulle(reponse);
      speechSynthesis.speak(new SpeechSynthesisUtterance(reponse));
      attendreRéponseVocale(); // dès que GPT a parlé, on écoute
    })
    .catch(err => console.error("❌ Erreur GPT :", err));
}

// ------------------------------
// 🎤 Reconnaissance vocale
// ------------------------------
function attendreRéponseVocale() {
  const reco = new webkitSpeechRecognition();
  reco.lang = "fr-FR";
  reco.interimResults = false;

  reco.onresult = (event) => {
    const reponseUtilisateur = event.results[0][0].transcript;
    console.log("🎤 Réponse utilisateur :", reponseUtilisateur);

    conversation.push({ role: "user", content: reponseUtilisateur });

    enregistrerInteraction(lastQuestionFromGPT, reponseUtilisateur); // log vers Google Sheets
    sendToGPT(); // boucle continue
  };

  reco.onerror = (e) => console.error("❌ Erreur reco vocale :", e);
  reco.start();
}

// ------------------------------
// 🧾 Log vers Google Apps Script
// ------------------------------
function enregistrerInteraction(question, reponse) {
  fetch("https://script.google.com/macros/s/AKfycb.../exec", {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // évite pré-vol CORS
    body: JSON.stringify({
      stagiaire,
      zone,
      date: new Date().toISOString(),
      question,
      reponse
    })
  })
    .then(r => r.text())
    .then(txt => console.log("✅ Interaction enregistrée :", txt))
    .catch(e => console.error("❌ Erreur AppSheet log :", e));
}

// ------------------------------
// 💬 Affichage dans une bulle 3D
// ------------------------------
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

