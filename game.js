const listOps = JSON.parse(localStorage.getItem('Methodes'));// chargement de la liste des methodes
  console.log(listOps);
const modelViewer = document.querySelector("#sanitairesModop");

const correct = JSON.parse(localStorage.getItem('correctAnswers'));//chargement des bonnes reponses 
console.log(correct);

const xyzClicked = (xyz) => {
  
  let dataset = xyz.dataset;
  
  var numero = xyz.slot.substring(8,9);// extraction du numero de slot
  console.log(numero) ;

  // Check if the form is being submitted
  if (event.target.tagName === "INPUT" && event.target.type === "submit" && event.target.id === "cfrang"+numero) {
    event.preventDefault();// permet de ne pas recrer le formulaire
    // Handle form submission
      // Get the rank
    var rank = event.target.form.elements.rang.value;
    var rankSlot = "hotspot-"+rank;
    
    console.log(rankSlot);
    console.log(xyz.slot)
    
        if(rankSlot === xyz.slot){

        // alert en fonction de la reponse
        
          alert(`bonne réponse rang ${rank}!`);
          xyz.childNodes[0].textContent = rank;
          //document.getElementById('rang').style.backgroundColor = "LightGreen";
          document.getElementById("rang" + numero).style.display = "none";
          const label = document.querySelector("label");
          const parent = label.parentNode;
           parent.removeChild(label);
          
        
           document.getElementById("cfrang"+numero).style.display = "none";// masquer confirm rang
           document.getElementById("details"+numero).style.display = "block";
           document.getElementById("cflist"+numero).style.display = "block";// show confirm liste
         
          const methodes = JSON.parse(localStorage.getItem('Methodes'));
          const operations = methodes.listeOps;
          
          console.log(methodes);
          console.log(operations);
          
          // remplissage du select + numero
          
           const select = document.getElementById("details"+numero);
          
          select.innerHTML = operations.map(option => `<option value="${option}">${option}</option>`).join('');
        }
           else{
             alert(`ce n'est pas le rang ${rank}!`);
           }
  } // soumission du choix des operations 
    else if (event.target.tagName === "INPUT" && event.target.type === "submit" && event.target.id === "cflist"+numero){
       event.preventDefault();
      console.log("list soumise");
      // collecte de la selection
      const select = document.getElementById("details"+numero);
      var options = select.options;
      var selectedValues = [];
      
      for (var i = 0;i<options.length;i++){
           if (options[i].selected) {
      selectedValues.push(options[i].value);
    }
  }
      var group = "hp"+numero
      console.log(correct[group])
    //comparaison des matrices
      if (selectedValues.every(val=>correct[group].includes(val))){     
        // si bonne reponse , elimination des items non selectionnés et changement de couleur
        var selectedOptions = Array.from(options).filter(o => o.selected);
        Array.from(options).forEach(o => {
        if (!selectedOptions.includes(o)) {
        select.remove(o.index);
    }
  });
         selectedOptions.forEach(o => {
         o.style.color = "blue";
         o.style.background = "pink";
         select.setAttribute("size",selectedOptions.length);
          document.getElementById("cflist"+numero).style.display = "none";
  });
        
      }
      
    }
    // comportement du click par defaut:creation du formulaire
   else {
    // Check if the form already exists
    let childForm = xyz.querySelector("form");
    if (!childForm) {
    
   childForm = document.createElement("form");
      // Create label for "rang"
      var labelRang = document.createElement("label");
      labelRang.setAttribute("for", "rang");
      labelRang.setAttribute("style", "color: blue");
      labelRang.innerHTML = "Rang";

      // Create number input for "rang"
      var inputRang = document.createElement("input");
      inputRang.setAttribute("type", "number");
      inputRang.setAttribute("id", "rang" + numero);// le numero est inclus à l'ID pour être unique
      inputRang.setAttribute("name", "rang");

      // Create label for "détails"
      var labelDetails = document.createElement("label");
      labelDetails.setAttribute("for", "détails");
      labelDetails.setAttribute("style", "color: blue");
      labelDetails.innerHTML = "Détails";

      // Create select field for "détails"
      var selectDetails = document.createElement("select");
      selectDetails.setAttribute("multiple", true);
      selectDetails.setAttribute("id", "details"+numero);
      selectDetails.setAttribute("name", "details");
      selectDetails.setAttribute("size", "10");
      selectDetails.setAttribute("hidden", true);

      // Create submit button for "ConfirmRang"
      var cfrang = document.createElement("input");
      cfrang.setAttribute("type", "submit");
      cfrang.setAttribute("id", "cfrang"+numero);
      cfrang.setAttribute("value", "ConfirmRang");

      // Create submit button for "ConfirmList"
      var cflist = document.createElement("input");
      cflist.setAttribute("type", "submit");
      cflist.setAttribute("id", "cflist"+numero);
      cflist.setAttribute("value", "ConfirmList");
      cflist.setAttribute("hidden", true);

      // Append elements to form
      childForm.appendChild(labelRang);
      childForm.appendChild(inputRang);
      childForm.appendChild(labelDetails);
      childForm.appendChild(selectDetails);
      childForm.appendChild(cfrang);
      childForm.appendChild(cflist);

      // Append form to the DOM
xyz.appendChild(childForm);
      
   //console.log("cfrang"+numero) ;

     // xyz.appendChild(childform);
      // positionnement automatique Camera en utilisant le hotspot.Dataset
    }
    modelViewer.cameraTarget = dataset.target;
    modelViewer.cameraOrbit = dataset.orbit;
    modelViewer.fieldOfView = "30deg";
  }
};


modelViewer.querySelectorAll("button.Hotspot").forEach((hotspot) => {
  console.log(hotspot);
  hotspot.addEventListener("click", () => xyzClicked(hotspot));
});


    // par le click sur les hotspots eux mêmes display Annotation

    
//      modelViewer2.querySelectorAll("button").forEach((hotspot) => {
      
//               console.log(hotspot);
//              hotspot.addEventListener("click", displayAnnot);

    function displayAnnot(e) {
      const slot = e.target.slot;
      console.log(slot);
      const id = "A" + slot.match(/\d+/)[0];
      console.log(id);
      var annotation = document.getElementById(id);
      annotation.style.display =
        annotation.style.display == "none" ? "block" : "none";
    }

// changement de couleur des organes securité (en chantier , ne fonctionne pas ).
    
    var security = document.querySelector("#security");
    security.addEventListener("click", changeColor); //application de la couleur
    
    function changeColor(){
      const sol = modelViewer.model.materials[2];
//       var colorString = "	1,0.2,0,0.2";
//       var color = colorString
//       .split(',')
// 	    .map(numberString => parseFloat(numberString));
    
//     sol.pbrMetallicRoughness.setBaseColorFactor(color);
    
      
//       // appli de la texture
              const createAndApplyTexture = async (channel, event) => {
               const texture = await modelViewer.createTexture(
              "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/risqueChute.png?v=1670951560339"
            );
          sol[channel].setTexture(texture);  
          }
 
     
           createAndApplyTexture("normalTexture", "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/risqueChute.png?v=1670951560339");
            sol.pbrMetallicRoughness.setRoughnessFactor(0.5);
             sol.pbrMetallicRoughness.setMetallicFactor(0.5);
            //sol.pbrMetallicRoughness.setBaseColorFactor("navy");
            // sol.setEmissiveFactor("#0000ffff");
        
  }

