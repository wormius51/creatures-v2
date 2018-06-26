
var blueClock = {
	hours: hours = 0,
	minuts: minuts = 0,
	seconds: seconds = 0,
	centiseconds: centiseconds = 0,
	interval: 0,
	isOn: false,
	draw: function () {
			var display = "";
			if (blueClock.hours > 0) {
				display = blueClock.hours + " : ";
			}
			display = display + blueClock.minuts + " : " + blueClock.seconds;
			if (blueClock.minuts < 1) {
				display = display + " " + blueClock.centiseconds;
			}
			document.getElementById("blueClock").innerText = display;
	},
	tic: function () {
		console.log("tic " + blueClock.minuts);
		blueClock.draw();
		blueClock.centiseconds--;
		if (blueClock.centiseconds < 0) {
			blueClock.seconds--;
			blueClock.centiseconds = 9;
			if (blueClock.seconds < 0) {
				blueClock.minuts--;
				blueClock.seconds = 59;
				if (blueClock.minuts < 0) {
					blueClock.hours--;
					blueClock.minuts = 59;
				}
			}
		}
	},
	start: function () {
		blueClock.isOn = true;
		blueClock.interval = setInterval(blueClock.tic, 100);
	},
	stop: function () {
		blueClock.isOn = false;
		clearInterval(blueClock.interval);
		blueClock.draw();
	},
};


var redClock = {
	hours: hours = 0,
	minuts: minuts = 0,
	seconds: seconds = 0,
	centiseconds: centiseconds = 0,
	interval: 0,
	isOn: false,
	draw: function () {
			var display = "";
			if (redClock.hours > 0) {
				display = redClock.hours + " : ";
			}
			display = display + redClock.minuts + " : " + redClock.seconds;
			if (redClock.minuts < 1) {
				display = display + " " + redClock.centiseconds;
			}
			document.getElementById("redClock").innerText = display;
	},
	tic: function () {
		console.log("tic " + redClock.minuts);
		redClock.draw();
		redClock.centiseconds--;
		if (redClock.centiseconds < 0) {
			redClock.seconds--;
			redClock.centiseconds = 9;
			if (redClock.seconds < 0) {
				redClock.minuts--;
				redClock.seconds = 59;
				if (redClock.minuts < 0) {
					redClock.hours--;
					redClock.minuts = 59;
				}
			}
		}
	},
	start: function () {
		redClock.isOn = true;
		redClock.interval = setInterval(redClock.tic, 100);
	},
	stop: function () {
		redClock.isOn = false;
		clearInterval(redClock.interval);
		redClock.draw();
	},
};