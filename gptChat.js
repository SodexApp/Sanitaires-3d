// -----------------------------
// 💬 Conversation initiale
// -----------------------------
let conversation = [
  {
    role: "system",
    content:  "Tu es un formateur en nettoyage. Réponds toujours en français, même si tu parles à un stagiaire qui parle une autre langue. Donne des conseils simples, clairs, adaptés au terrain."
  },
  {
    role: "assistant",
    content: "Tu es en situation de nettoyage. As-tu rencontré une difficulté ?"
  }
];

// 🔧 Utilitaire pour lire les paramètres URL
function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// 📥 Récupération dynamique des données AppSheet
let stagiaire = getParam("userName") || "Stagiaire inconnu";
let session = getParam("sessionId") || "Session inconnue";
let langue = getParam("langue") || "fr";

let lastBotMessage = ""; // 🔁 Mémorise le dernier message assistant

// -----------------------------
// 🚀 Lancement de l'exercice
// -----------------------------
function lancerExerciceDialogue() {
  const phrase = conversation[1].content;
  afficherDansBulle(phrase);
  lastBotMessage = phrase;

  const synth = new SpeechSynthesisUtterance(phrase);
  synth.lang = "fr-FR";
  synth.onend = () => attendreRéponseVocale(); // Attente après la voix
  speechSynthesis.speak(synth);
}

function traduireProblemeEnFrancais(input, callback) {
  const messages = [
    { role: "system", content: "Tu es un traducteur. Traduis ce que dit le stagiaire en français, sans commenter." },
    { role: "user", content: input }
  ];

  fetch("https://gpt-backend-vercel.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  })
    .then(res => res.json())
    .then(data => {
      const traduction = data.reply || input;
      callback(traduction); // on poursuit ici
    })
    .catch(err => {
      console.error("❌ Erreur de traduction :", err);
      callback(input); // fallback
    });
}


// -----------------------------
// 🎤 Attente de la réponse orale
// -----------------------------
function attendreRéponseVocale() {
  const reco = new webkitSpeechRecognition();
  reco.lang = "fr-FR";
  reco.interimResults = false;

  reco.onresult = event => {
    const reponse = event.results[0][0].transcript;
    console.log("🎤 Réponse utilisateur :", reponse);

  // Traduire avant de lancer GPT
  traduireProblemeEnFrancais(reponseUtilisateur, (problemeTraduit) => {
    conversation.push({ role: "user", content: problemeTraduit });
    envoyerAChatGPT(problemeTraduit); // ← on continue avec le texte français
  });
};

  reco.onerror = e => {
    alert("Erreur reconnaissance vocale : " + e.error);
    console.error("❌ Reco vocale :", e.error);
  };

  reco.start();
}

// -----------------------------
// 🤖 Envoi à ChatGPT via backend
// -----------------------------
function envoyerAChatGPT(texteUtilisateur) {
  fetch("https://gpt-backend-vercel.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: conversation })
  })
    .then(res => res.json())
    .then(data => {
      const reponse = data.reply || "Je n’ai pas compris.";
      conversation.push({ role: "assistant", content: reponse });

      afficherDansBulle(reponse);
      lastBotMessage = reponse;

      enregistrerInteraction(texteUtilisateur, reponse); // LOG GSheet

      const synth = new SpeechSynthesisUtterance(reponse);
      synth.lang = langue;// ← vocal dans la langue choisie
      synth.onend = () => {
        // Optionnel : afficher un bouton "Autre difficulté"
        console.log("🟢 Fin réponse GPT");
      };
      speechSynthesis.speak(synth);
    })
    .catch(err => {
      console.error("❌ Erreur GPT :", err);
    });
}

// -----------------------------
// 🗂️ Enregistrement dans GSheet
// -----------------------------
function enregistrerInteraction(probleme, conseil) {
  fetch("https://script.google.com/macros/s/AKfycbz-6CZyLfbH9L0um7CaIIzUqStGCs9HQkVA7aRg6PcGH5Kh1jLk49EfULicX5OKj4Y/exec", {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      stagiaire,
      zone,
      date: new Date().toISOString(),
      probleme,
      conseil
    })
  })
    .then(r => r.text())
    .then(txt => console.log("✅ Log AppSheet :", txt))
    .catch(e => console.error("❌ Erreur log AppSheet :", e));
}

// -----------------------------
// 💬 Affiche une bulle texte 3D
// -----------------------------
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


// // ------------------------------
// // 🔁 Conversation de départ
// // ------------------------------
// let conversation = [
//   { role: "system", content: "Tu es un formateur en nettoyage professionnel. Pose une première question adaptée à la zone ciblée." }
// ];

// let stagiaire = "Nom Prénom";   // À adapter depuis AppSheet
// let zone = "sanitaires";        // À adapter selon le point cliqué

// let lastQuestionFromGPT = "";   // Pour stocker la dernière question posée

// // ------------------------------
// // 🚀 Lancement initial
// // ------------------------------
// function lancerDialogue() {
//   sendToGPT(); // GPT initie la conversation
// }

// // ------------------------------
// // 🤖 Envoi à GPT via ton backend
// // ------------------------------
// function sendToGPT() {
//   fetch("https://gpt-backend-vercel.vercel.app/api/chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ messages: conversation })
//   })
//     .then(res => res.json())
//     .then(data => {
//       const reponse = data.reply || "Je n’ai pas compris.";
//       conversation.push({ role: "assistant", content: reponse });

//       lastQuestionFromGPT = reponse;

//       afficherDansBulle(reponse);
//       speechSynthesis.speak(new SpeechSynthesisUtterance(reponse));
//       attendreRéponseVocale(); // dès que GPT a parlé, on écoute
//     })
//     .catch(err => console.error("❌ Erreur GPT :", err));
// }

// // ------------------------------
// // 🎤 Reconnaissance vocale
// // ------------------------------
// function attendreRéponseVocale() {
//   const reco = new webkitSpeechRecognition();
//   reco.lang = "fr-FR";
//   reco.interimResults = false;

//   reco.onresult = (event) => {
//     const reponseUtilisateur = event.results[0][0].transcript;
//     console.log("🎤 Réponse utilisateur :", reponseUtilisateur);

//     conversation.push({ role: "user", content: reponseUtilisateur });

//     enregistrerInteraction(lastQuestionFromGPT, reponseUtilisateur); // log vers Google Sheets
//     sendToGPT(); // boucle continue
//   };

//   reco.onerror = (e) => console.error("❌ Erreur reco vocale :", e.error);
//   reco.start();
// }

// // ------------------------------
// // 🧾 Log vers Google Apps Script
// // ------------------------------
// function enregistrerInteraction(question, reponse) {
//   fetch("https://script.google.com/macros/s/AKfycbz-6CZyLfbH9L0um7CaIIzUqStGCs9HQkVA7aRg6PcGH5Kh1jLk49EfULicX5OKj4Y/exec", {
//     method: "POST",
//     headers: { "Content-Type": "text/plain;charset=utf-8" }, // évite pré-vol CORS
//     body: JSON.stringify({
//       stagiaire,
//       zone,
//       date: new Date().toISOString(),
//       question,
//       reponse
//     })
//   })
//     .then(r => r.text())
//     .then(txt => console.log("✅ Interaction enregistrée :", txt))
//     .catch(e => console.error("❌ Erreur AppSheet log :", e));
// }

// // ------------------------------
// // 💬 Affichage dans une bulle 3D
// // ------------------------------
// function afficherDansBulle(texte) {
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   canvas.width = 512;
//   canvas.height = 256;
//   ctx.fillStyle = 'white';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = 'black';
//   ctx.font = '20px sans-serif';
//   ctx.fillText(texte, 10, 50);
//   const texture = new THREE.CanvasTexture(canvas);
//   const material = new THREE.SpriteMaterial({ map: texture });
//   const sprite = new THREE.Sprite(material);
//   sprite.scale.set(3, 1.5, 1);
//   sprite.position.copy(camera.position).add(new THREE.Vector3(0, -1, -5));
//   scene.add(sprite);
//   setTimeout(() => scene.remove(sprite), 10000);
// }

