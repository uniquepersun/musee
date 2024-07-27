document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseButton = document.getElementById("playPauseButton");
    const stopButton = document.getElementById("stopButton");
    const seekBar = document.getElementById("seekBar");
    const selectFolderButton = document.getElementById("selectFolderButton");
    const filePopup = document.getElementById("filePopup");
    const folderSelectButton = document.getElementById("folderSelect");

    let musicFiles = [];
    let currentFileIndex = 0;

    playPauseButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = "Play";
        }
    });

    stopButton.addEventListener("click", function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playPauseButton.textContent = "Play";
    });

    audioPlayer.addEventListener("timeupdate", function() {
        const value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = value;
    });

    seekBar.addEventListener("input", function() {
        const seekBarValue = parseFloat(seekBar.value);
        if (!isNaN(seekBarValue) && audioPlayer.duration > 0) {
            const time = (seekBarValue / 100) * audioPlayer.duration;
            audioPlayer.currentTime = time;
        }
    });

    audioPlayer.addEventListener("loadedmetadata", function() {
        seekBar.addEventListener("input", function() {
            const seekBarValue = parseFloat(seekBar.value);
            if (!isNaN(seekBarValue) && audioPlayer.duration > 0) {
                const time = (seekBarValue / 100) * audioPlayer.duration;
                audioPlayer.currentTime = time;
            }
        });
    });

    selectFolderButton.addEventListener("click", function() {
        console.log("Select Folder clicked");
        filePopup.style.display = "flex";
    });

    folderSelectButton.addEventListener("click", async function() {
        try {
            console.log("Folder Select button clicked");
            const dirHandle = await window.showDirectoryPicker();
            musicFiles = [];
            for await (const entry of dirHandle.values()) {
                if (entry.kind === 'file' && entry.name.endsWith('.mp3')) {
                    musicFiles.push(entry);
                }
            }
            if (musicFiles.length > 0) {
                currentFileIndex = 0;
                loadMusicFile(musicFiles[currentFileIndex]);
                filePopup.style.display = "none";
            } else {
                alert("No music files found in the selected folder.");
            }
        } catch (err) {
            console.error("Error whire selecting folder:", err);
        }
    });

    async function loadMusicFile(fileHandle) {
        try {
            const file = await fileHandle.getFile();
            const fileURL = URL.createObjectURL(file);
            console.log("Loading file:", file.name, fileURL);
            audioPlayer.src = fileURL;
            audioPlayer.load();
        } catch (err) {
            console.error("Error loading music:", err);
        }
    }
});
