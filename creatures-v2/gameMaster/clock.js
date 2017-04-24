module.exports = function() {
	var clock = {
		hours: hours = 0,
		minuts: minuts = 0,
		seconds: seconds = 0,
		centiseconds: centiseconds = 0,
		hoursIncrament: hoursIncrament = 0,
		minutsIncrament: minutsIncrament = 0,
		secondsIncrament: secondsIncrament = 0,
		centisecondsIncrament: centisecondsIncrament = 0,
		interval: 0,
		tic: function () {
			clock.centiseconds--;
			if (clock.centiseconds < 0) {
				clock.seconds--;
				clock.centiseconds = 9;
				if (clock.seconds < 0) {
					clock.minuts--;
					clock.seconds = 59;
					if (clock.minuts < 0) {
						clock.hours--;
						clock.minuts = 59;
					}
				}
			}
		},
		start: function () {
			clock.interval = setInterval(clock.tic, 100);
		},
		stop: function () {
			clearInterval(clock.interval);
			clock.hours += clock.hoursIncrament;
			clock.minuts += clock.minutsIncrament;
			clock.seconds += clock.secondsIncrament;
			clock.centiseconds += clock.centisecondsIncrament;
			
			if (clock.centiseconds > 9) {
				clock.seconds++;
				clock.centiseconds -= 10;
			}
			if (clock.seconds > 59) {
				clock.minuts++;
				clock.seconds -= 60;
			}
			if (clock.minuts > 59) {
				clock.hours++;
				clock.minuts -= 60;
			}
		},
		timeUp: function () {
			if (clock.hours < 1 && clock.minuts < 1 && clock.seconds < 1 && clock.centiseconds < 1) {
				clearInterval(clock.interval);
				return true;
			}else {
				return false;
			}
		}
	};
	return clock;
};