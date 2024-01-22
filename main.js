function setup() 
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white"); 
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;

}

function preload() 
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas() 
{
    background("white")
}

function draw() 
{
    // Set Stroke Weight to 13
    strokeWeight(13);
    // Set Stroke Color to Black 
    stroke(0);
    // If Mouse Pressed, Draw Line Between Previous and Current Mouse Positions
    if (mouseIsPressed) 
    {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }   
}

function classifyCanvas() 
{
   classifier.classify(canvas, gotResult);    
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;

    document.getElementById('confidence').innecrHTML = 'Confidence: ' + Math.round(results[0].confidence * 100); + '%';

    utterThis = new SpeechSynthesisisUtterence(results[0].label);
    synth.speak(utterThis);


}