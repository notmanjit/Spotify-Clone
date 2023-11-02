console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let img = new Image('covers/Jab-We-Met.jpg');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongImg = document.getElementById('masterSongImg');
let songItems = Array.from(document.getElementsByClassName('songItem'));  //songItems

let songs = [
    {songName: "Tum Se Hi", filePath: "songs/1.mp3", coverPath: "covers/Jab-We-Met.jpg"},
    {songName: "Tera Zikr", filePath: "songs/2.mp3", coverPath: "covers/Tera-Zikr.jpg"},
    {songName: "Dagabaaz Re", filePath: "songs/3.mp3", coverPath: "covers/Dagabaaz-Re.jpg"},
    {songName: "Haule Haule", filePath: "songs/4.mp3", coverPath: "covers/Haule-Haule.jpg"},
    {songName: "Choo Lo", filePath: "songs/5.mp3", coverPath: "covers/Choo-Lo.jpg"},
    {songName: "Kabhi Tumhe", filePath: "songs/6.mp3", coverPath: "covers/Kabhi-Tumhe.jpg"},
    {songName: "Tu Hai Kahan", filePath: "songs/7.mp3", coverPath: "covers/Tu-hai-kahan.jpg"},
    {songName: "Awari", filePath: "songs/8.mp3", coverPath: "covers/Ek-Villain.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value  * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        masterSongImg.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongImg.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
