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
     


              

    


