// Create a new instance of AxesHelper
const axesHelper = new THREE.AxesHelper(5); // The parameter specifies the size of the axes helper

// Add the axes helper to the scene
scene.add(axesHelper);

// Create a CameraHelper for the camera
var helper = new THREE.CameraHelper(camera);
scene.add(helper);
// parametres de la scene 
const titles = [
  "lavage des mains \nAération\nBalisage",
  "tirer la chasse \nVaporiser toilettes \nLavabo",
  "corbeilles \nToiles d'araignées",
  "consomables",
  "nettoyage miroir \nLavabo",
  "nettoyage \ncuvette",
  "points de \ncontact",
  "lavage sol",
  "detartrage"
];

const names = [
  "plane1",
  "plane2",
  "plane3",
  "plane4",
  "plane5",
  "plane6",
  "plane7",
  "plane8",
  "plane9"
];
const coordinates = [
  [-6, 5, 8,"lightgreen",1],
  [-2, 2, 0,"lightgreen",2],
  [4.5, -2, 0,"lightgreen",3],
  [-6, 0, 3,"lightgreen",4],
  [3.5, 2.2, 1,"lightgreen",5],
  [-3, -1, 3,"lightgreen",6],
  [6, 3.5, 0,"lightgreen",7],
  [2, -3, 4,"lightgreen",8],
  [-2.7,-.6, 0,"orange",9],
];

const videosAsset = [
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/preparation.mp4?v=1681800621202",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/pulve_cuvette.mp4?v=1681800850473",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/poubelles2.mp4?v=1681800810104",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/lavabo.mp4?v=1681800705158",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/miroir.mp4?v=1681800750717",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/cuvette.mp4?v=1681800651250",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/ptsContact.mp4?v=1681800824074",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/lavageSol.mp4?v=1681800720805",
  ""
];

var videos = [
  document.createElement("video"),
  document.createElement("video"),
  document.createElement("video"),
  document.createElement("video"),
  document.createElement("video"),
  document.createElement("video"),
  document.createElement("video"),
  document.createElement("video"),
   document.createElement("video")
  
];

// Set source and properties of each video element
for (var i = 0; i < videos.length; i++) {
  if(videos[i]){
  videos[i].src = videosAsset[i];
  videos[i].crossOrigin = "anonymous";
  videos[i].load();
  videos[i].muted = true;
  //videos[i].play();
}
}

// Create video textures from each video element
var videoTextures = [];
for (var i = 0; i < videos.length; i++) {
  var videoTexture = new THREE.VideoTexture(videos[i]);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;
  videoTextures.push(videoTexture);
}

// Create sprite materials with video textures
var spriteMaterials = [];
for (var i = 0; i < videoTextures.length; i++) {
  var spriteMaterial = new THREE.SpriteMaterial({ map: videoTextures[i] });
  spriteMaterials.push(spriteMaterial);
}

// Create video sprites with sprite materials
var videoSprites = [];
for (var i = 0; i < spriteMaterials.length; i++) {
  var videoSprite = new THREE.Sprite(spriteMaterials[i]);
  videoSprite.scale.set(3, 3, 1); // adjust size of video sprites

  videoSprite.position.set(
    coordinates[i][0] ,
    coordinates[i][1] ,
    coordinates[i][2] +.2,
  );
  videoSprites.push(videoSprite);
  scene.add(videoSprite);
  videoSprites[i].visible = false; // initially hide video sprites
}

// création des sprites titre

var titleSprites = [];
for (let i = 0; i < coordinates.length; i++) {
  const canvas2 = document.createElement("canvas");
  const context2 = canvas2.getContext("2d");
  const width = 400; // decrease the width of the canvas
  const height = 200; // decrease the height of the canvas
  canvas2.width = width;
  canvas2.height = height;
  context2.fillStyle = "red"; //'rgba(0, 0, 0, 0)'; // set transparent background
  context2.fillRect(0, 0, width, height);
  context2.fillStyle = "white"; // set red color
  context2.font = "bold 40px Arial";
  context2.textAlign = "center";
  context2.textBaseline = "middle";
  // context2.fillText(texts[i],width / 2, height/ 2);
  const text = titles[i];
  const lines = text.split("\n");
  const lineHeight = 40; // Adjust this value to adjust the spacing between lines
  const y = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    context2.fillText(line, width / 2, y + j * lineHeight);
  }

  const texture2 = new THREE.CanvasTexture(canvas2);
  const material2 = new THREE.SpriteMaterial({
    map: texture2,
    color: "lightgray", //0xcccccc,
    tranparent: true,
    opacity: .7, // set the color of the material

    // set the opacity of the material
  });

  const titleSprite = new THREE.Sprite(material2);
  titleSprite.name = "textsprite" + i;
  console.log(titleSprite.name);
  titleSprite.scale.set(2, 1, 1);
  titleSprite.position.set(
    coordinates[i][0]-.5,
    coordinates[i][1]+2 ,
    coordinates[i][2]
  );
  console.log(titles[i]);
 titleSprites.push(titleSprite);
  scene.add(titleSprite);
  titleSprites[i].visible = false;
}

// creation des sphereNumeros


var sphereNumeros = [];
for (let i = 0; i < coordinates.length; i++) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = 64; // decrease the width of the canvas
  const height = 64; // decrease the height of the canvas
  canvas.width = width;
  canvas.height = height;
  context.fillStyle = coordinates[i][3]; //'rgba(0, 0, 0, 0)'; // set transparent background
  context.fillRect(0, 0, width, height);
  context.fillStyle = "red"; // set red color
  context.font = "24px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(String(coordinates[i][4]), width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);


  const material = new THREE.MeshBasicMaterial({
    map: texture,
    //side: THREE.DoubleSide,
    emissive: coordinates[i][3],
     transparent :true,
     opacity:0.7
  });

    var geometry = new THREE.SphereGeometry(.6,15,15)
  var sphereNumero = new THREE.Mesh(geometry, material);
  sphereNumero.name = "sphere" + i;
  sphereNumero.position.set(
    coordinates[i][0],
    coordinates[i][1],
    coordinates[i][2]+1.5
  );
 sphereNumero.rotation.y = Math.PI / -2;
  // planeNumero.rotateY(THREE.Math.degToRad(-60));
 
 sphereNumeros.push(sphereNumero);
  scene.add(sphereNumero);
 
}
// Define a flag to control the toggle function
var isToggleFunctionRunning = true;

// Define the toggle function
var toggleFunction = setInterval(() => {
  if (isToggleFunctionRunning) {
    sphereNumeros[8].material.opacity =  sphereNumeros[8].material.opacity === 0.2 ? 1 : 0.2; // Toggle opacity between 0.7 and 1
  }
}, 800); 




var images = [
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video1.png?v=1693228543809",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video2.png?v=1693228553429",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video3.png?v=1693228562542",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video4.png?v=1693228571517",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video5.png?v=1693228579071",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video6.png?v=1693228587134",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video7.png?v=1693228595090",
  "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/video8.png?v=1693228602065",
  ""
];

// Create an array to hold the sprites
var comments = [];

for (var i = 0; i < images.length; i++) {
  var texture = new THREE.TextureLoader().load(images[i]);

  var spriteMaterial = new THREE.SpriteMaterial({ map: texture });

  var sprite = new THREE.Sprite(spriteMaterial);

  // Set the sprite's position
  sprite.position.set(
    coordinates[i][0]+1 ,
    coordinates[i][1]+1.5,
    coordinates[i][2] 
  );
  //sprite.position.set(-2,0,-2)

  // Set the sprite's scale if needed
  sprite.scale.set(2, 1, 1); // Adjust scale as needed

  // Hide sprites initially
  sprite.visible = false;

  // Add the sprite to the scene
  scene.add(sprite);

  // Add the sprite to the array for later use
  comments.push(sprite);
}

// panneau publicitaire

const pubAsset = "https://cdn.glitch.global/a37f1965-d606-4778-85b1-07e3d5a5508e/logo.png?v=1663832553948";
var pubTexture = new THREE.TextureLoader().load(pubAsset);

const pubGeo= new THREE.PlaneGeometry(1.37,1.37);
const pubMaterial = new THREE.MeshBasicMaterial({map:pubTexture});

// Create an array to hold the cloned meshes
const pubClones = [];

// Create and position the clones
for (let i = 0; i < 4; i++) {
  const pubClone = new THREE.Mesh(pubGeo, pubMaterial);
  pubClone.position.set(i * 2.75-3.1,2.9*i+3.2, -1.45);
scene.add(pubClone);
    pubClones.push(pubClone);
  
}


