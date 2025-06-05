const Methodes ={
  listeOps:[
 "preparation du chantier","lavage des mains","Aération/Balisage",
  "Tirer la chasse","Vaporiser dans les toilettes","vaporiser le lavabo",
  "Vider les corbeilles","Toiles d'araignées","Changer les consommables",
  "Nettoyage du miroir","Nettoyer le lavabo","Nettoyer la cuvette", "Desinfection des points de contact","Balayage humide/lavage Manuel"
]
};
const correctAnswers = {
  hp1:["preparation du chantier","lavage des mains","Aération/Balisage"],
  hp2:[ "Tirer la chasse","Vaporiser dans les toilettes","vaporiser le lavabo"],
  hp3:["Vider les corbeilles","Toiles d'araignées"],
  hp4:["Changer les consommables"],
  hp5:["Nettoyage du miroir","Nettoyer le lavabo"],
  hp6:["Nettoyer la cuvette"],
  hp7:[ "Desinfection des points de contact"],
  hp8:["Balayage humide/lavage Manuel"],
}
window.onload= function(){
localStorage.setItem('Methodes', JSON.stringify(Methodes));
localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
  
 // console.log(Methodes)
 // console.log(correctAnswers)
}

