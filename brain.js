let pogress = document.getElementById("bar");
let song = document.getElementById("song");
let control = document.getElementById("play");

song.onloadedmetadata = function (){
    ProgressEvent.max = song.duration;
    ProgressEvent.value = song.currentTime;

}
function plp(){
    if(control.classList.contains("pause")){
        song.pause();
        document.getElementById("pause").style.display="none";
        document.getElementById("play").style.display="inherit";
        
    }
    else{
        song.play();
        document.getElementById("pause").style.display="inherit";
        document.getElementById("play").style.display="none";
    }
}  