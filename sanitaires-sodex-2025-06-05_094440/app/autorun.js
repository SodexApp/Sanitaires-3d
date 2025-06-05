  // par le click sur les hotspots eux mêmes display Annotation

    const modelViewer2 = document.querySelector('model-viewer');
     modelViewer2.querySelectorAll("button").forEach((hotspot) => {
      
              console.log(hotspot);
             hotspot.addEventListener("click", displayAnnot);
     });
     

    function displayAnnot(e) {
      const slot = e.target.slot;
      console.log(slot);
      
      var num = slot.match(/\d+/)[0];
      const id = "A" + slot.match(/\d+/)[0];
      console.log(id);
      var annotation = document.getElementById(id);
      annotation.style.display =
        annotation.style.display == "none" ? "block" : "none";
      displayVideo(num);
    }

function displayVideo(numero){
  var videoArray = ["d6u6C6Tkxt8",
                    "0-UqCZoa4z8",
                    "D84OSxvBi0s",
                    "BTiHXRfEHj4",
                    "rSyi8hq_2r4",
                    "bzXTc7zvmMQ",
                    "lenjt3-9rDY",
                    "kJVC4q5JoTk"];
  var iframe = document.getElementById('video');
  iframe.src = [ 'https://www.youtube.com/embed/', videoArray[numero-1], '?rel=0' ].join( '' );
}
     

// autorun1 //////////////////////////////////////////////////
// function autorun(){
//   console.log("autorun")  
//   // var viewer = document.querySelector('model-viewer');
//   const viewer = document.querySelector("#sanitairesModop"); 
//   console.log(viewer.id)
//   var positions = [];
//   var orbits = [];
//   var topics = [];
//   const hotspots =   viewer.querySelectorAll("button.Hotspot");;
//   hotspots.forEach((hotspot) => {  
//     let dataset = hotspot.dataset;
//     positions.push(dataset.position);
//     orbits.push(dataset.orbit);
//   });
    
//      for (let i = 0; i < positions.length; i++) {
//    setTimeout(function() {
//       // viewer.goto(positions[i][0],positions[i][1], positions[i][2]);
      
//     viewer.cameraTarget = positions[i];
//    viewer.cameraOrbit = orbits[i];
//     viewer.fieldOfView = "30deg";
     
//       document.getElementById("details"+i+1).style.display = "block";
//      // viewer.autoRotate = true;
//     }, i * 4500);
//   }; 
  
    
// }
// autorun2/////////////////////////////////////////////////////
// let flag = true;
// let i = 0;
// function autorun(){
//   console.log("autorun")
//   const viewer = document.querySelector("#sanitairesModop");
//   console.log(viewer.id)
//   var positions = [];
//   var orbits = [];
//   const hotspots = viewer.querySelectorAll("button.Hotspot");;
//   hotspots.forEach((hotspot) => {
//     let dataset = hotspot.dataset;
//     positions.push(dataset.position);
//     orbits.push(dataset.orbit)
//   });
//   function run(){
//     if(flag){
//       if(i < positions.length){
        
//         console.log("details" + (i+1))
//         viewer.cameraTarget = positions[i];
//         viewer.cameraOrbit = orbits[i];
//         viewer.fieldOfView = "30deg";
//         let el = document.getElementById('details' + (i+1));
//         if(el) el.style.display = "block";
//         i++;
//         setTimeout(run, 4500);
//       }
//     }
//   }
//   run();
// }

// function stop(){
//   flag = false;
// }

// function resume(){
//   flag = true;
//   run();
// }
              
              

    


