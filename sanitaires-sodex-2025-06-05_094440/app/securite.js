


const secureText =[
  
  "électrique",
  "glissade",
  "contamination"
  
];
const secureCord = [
  [6, -4,-1],
  [6, -4.5,2],
  [-1.5, -2, 0]
  ];


// création des sprites titre

var titleSecures = [];
for (let i = 0; i < secureCord.length; i++) {
  const canvas3 = document.createElement("canvas");
  const context3 = canvas3.getContext("2d");
  const width = 400; // decrease the width of the canvas
  const height = 200; // decrease the height of the canvas
  canvas3.width = width;
  canvas3.height = height;
  context3.fillStyle = "yellow"; //'rgba(0, 0, 0, 0)'; // set transparent background
  context3.fillRect(0, 0, width, height);
  context3.fillStyle = "black"; // set red color
  context3.font = "bold 50px Arial";
  context3.textAlign = "center";
  context3.textBaseline = "middle";
   context3.fillText(secureText[i],width / 2, height/ 2);
  const text = secureText[i];
  const lines = text.split("\n");
  const lineHeight = 40; // Adjust this value to adjust the spacing between lines
  const y = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    context3.fillText(line, width / 2, y + j * lineHeight);
  }

  const texture3 = new THREE.CanvasTexture(canvas3);
  const material3 = new THREE.SpriteMaterial({
    map: texture3,
    color: "lightgray", //0xcccccc,
    tranparent: true,
    opacity: .7, // set the color of the material

    // set the opacity of the material
  });

  const titleSecure = new THREE.Sprite(material3);
  titleSecure.name = "titleSecure" + i;
  console.log(titleSecure.name);
  titleSecure.scale.set(2, 1, 1);
  titleSecure.position.set(
    secureCord[i][0]-.5,
    secureCord[i][1]+2 ,
    secureCord[i][2]
  );
  console.log(titleSecure);
 titleSecures.push(titleSecure);
  scene.add(titleSecure);
  titleSecures[i].visible = true;
}