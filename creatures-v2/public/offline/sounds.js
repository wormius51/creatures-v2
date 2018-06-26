var sounds = {
	musicVolume: musicVolume = 0.6,
	soundVolume: soundVolume = 0.4,
	
	musicMute: musicMute = true,
	soundMute: soundMute = false,
	
	music: music = document.createElement("audio"),
	
	playMusic: function () {
		if (!musicMute) {
			
			var source = document.createElement("source");
			music.volume = musicVolume;
			music.loop = true;
			source.src = "sounds/music.m4a";
			source.type = "audio/mp3";
			music.appendChild(source);
			music.play();
		}
	},
	
	muteUnmuteMusic: function () {
		if (this.musicMute) {
			muteunmute.src = "buttons/mutemusic.bmp";
			music.play();
			this.musicMute = false;
		}else {
			muteunmute.src = "buttons/unmutemusic.bmp";
			music.pause();
			this.musicMute = true;
		}
	},
	
	clickOne: function () {
		if (!soundMute) {
			var sound = document.createElement("audio");
			var source = document.createElement("source");
			sound.volume = soundVolume;
			source.src = "sounds/click1.mp3";
			source.type = "audio/mp3";
			sound.appendChild(source);
			sound.play();
		}
	},
	
	clickTwo: function () {
		if (!soundMute) {
			var sound = document.createElement("audio");
			var source = document.createElement("source");
			sound.volume = soundVolume;
			source.src = "sounds/click2.mp3";
			source.type = "audio/mp3";
			sound.appendChild(source);
			sound.play();
		}
	}
}