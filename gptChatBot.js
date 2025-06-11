     // APPEL GPT (ASYNCHRONE)
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
    }else{
      console.log("No  sphere' object found intersectsObject.");
    }
   isToggleFunctionRunning = true;
  }

