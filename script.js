let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/m_d7FmWwD/'; // URL del modelo de Teachable Machine
let image;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // Carga el modelo antes de que se cargue la página
}

function setup() {
  createCanvas(320, 260); // Crea un canvas de 320x260 píxeles
  image = createCapture(image); // Captura el video de la cámara
  image.size(320, 240); // Establece el tamaño del video
  image.hide(); // Oculta el video original
  classifyVideo(); // Clasifica el video
}

function draw() {
  background(0); // Establece el fondo negro
  fill(255); // Establece el color de relleno blanco
  textSize(16); // Establece el tamaño de la fuente
  textAlign(CENTER); // Establece la alineación del texto al centro
  text(label, width / 2, height - 4); // Muestra la etiqueta de la clasificación en la parte inferior del canvas
  let emoji = { // Objeto que asocia las etiquetas de clasificación con emojis
    "Class 1": "😊",
    "Class 2": "🤣",
    "Class 3": "🖐"
  }[label];
  textSize(100); // Establece el tamaño de la fuente
  text(emoji, width / 2, height / 2); // Muestra el emoji correspondiente a la etiqueta de clasificación en el centro del canvas
}

function classifyVideo() {
  classifier.classify(flippedVideo, gotResult); // Clasifica el video y llama a la función gotResult cuando se obtienen los resultados
  flippedVideo.remove(); // Elimina el video invertido
}

function gotResult(error, results) {
  if (error) {
    console.error(error); // Muestra el error en la consola
    return;
  }
  label = results[0].label; // Obtiene la etiqueta de clasificación del primer resultado
  classifyVideo(); // Clasifica el video de nuevo
}