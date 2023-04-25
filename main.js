prediction_1 = 'ERROR EVERYONE THERE IS AN ERROR WEE WOO WEE WOO WEE WOO';


Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById('camera');

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0cOQhwUKz/model.json', modelLoaded);

function modelLoaded() {
    console.log('model is successfully loaded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
}

function speak() {
    var synth = window.speechSynthesis;
    data_1 = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error){
        console.error();
    }else{
        console.log(results);
        document.getElementById('result_object_name').innerHTML = results[0].label;

        prediction_1 = results[0].label;
        toSpeak = '';
        
        if(results[0].label == 'thumbs up'){
        document.getElementById('result_object_gesture_icon').innerHTML = '&#128077;';
        toSpeak = 'All the best';
        speak();
        }
        if(results[0].label == 'Victory'){
            document.getElementById('result_object_gesture_icon').innerHTML = '&#9996;';
            toSpeak = 'Amazing victory';
            speak();
        }
        if(results[0].label == 'thumbs down'){
            document.getElementById('result_object_gesture_icon').innerHTML = '&#128078;';
            toSpeak = 'Sad';
            speak();
        }
    }
}