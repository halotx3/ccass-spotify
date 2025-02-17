// Variable and fuctions for the play Pause buttons (ML - Mozard and Rock)
var ml = document.getElementById("mlAudio"); 
var rock = document.getElementById("rockAudio"); 

function playml() { 
  ml.play(); 
  console.log("Play Song");
  console.log(ml);
} 

function pauseml() { 
  ml.pause(); 
  console.log("Pause Song");
  console.log(ml);
}

function playrock() { 
  rock.play(); 
  console.log("Play Song");
  console.log(rock);
} 

function pauserock() { 
  rock.pause(); 
  console.log("Pause Song");
  console.log(rock);
}

// File Change/Selection section - controls canvas
// I tried to create a function, cut and paste sections into the above, etc
// but I couldn't get the buttons to work with the canvas

window.onload = function() {
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth * .50;
    canvas.height = window.innerHeight * .60;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#272822";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2.0;
        
        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};