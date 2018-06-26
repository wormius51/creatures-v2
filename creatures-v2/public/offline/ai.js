var aiblueparts = 0;
var airedparts = 0;
var aibluecreatures = 0;
var airedcreatures = 0;

var aipartical_team = new Array();
var aipartical_x = new Array();
var aipartical_y = new Array();
var aipartical_horizontal = new Array();
var aipartical_vertical = new Array();
var aipartical_selected = new Array();
var aipartical_element = new Array();

var aiipartical_x = new Array();
var aiipartical_y = new Array();
var aiipartical_horizontal = new Array();
var aiipartical_vertical = new Array();
var aiipartical_selected = new Array();



//computer is playing.
function ai() {
	var maxeval = -99999999999;
	
	
	var choices = new Array();
	var team;
	aibluecreatures = 0;
	airedcreatures = 0;
	aiblueparts = 0;
	airedparts = 0;
	var choicenumber = 0;
	if (turnblue) {
		team = "blue";
	}else{
		team = "red";
	}
	for (y=0;y<n;y++) {
		for (x=0;x<n;x++) {
			var index = x + "x" + y;
			
			aipartical_team[index] = partical_team[index];
			aipartical_x[index] = partical_x[index];
			aipartical_y[index] = partical_y[index];
			aipartical_horizontal[index] = partical_horizontal[index];
			aipartical_vertical[index] = partical_vertical[index];
			aipartical_selected[index] = partical_selected[index];

			aiipartical_x[index] = ipartical_x[index];
			aiipartical_y[index] = ipartical_y[index];
			aiipartical_horizontal[index] = ipartical_horizontal[index];
			aiipartical_vertical[index] = ipartical_vertical[index];
			aiipartical_selected[index] = ipartical_selected[index];
			
			if (partical_team[index] == team || partical_team[index] == "purple") {
				choices[choicenumber] = index;
				choicenumber++;
			}
		}
	}
	var choice = Math.floor(Math.random() * choices.length);
	var selectedindex = choices[choice];
	select(selectedindex);
	var firstselect = selectedindex;
	choices = [];
	choice = -1;
	
	choicenumber = 0;
	
	for (y=0;y<n;y++) {
		for (x=0;x<n;x++) {
			var index = x + "x" + y;
			if (partical_selected[index] == "child") {
				
				//if (2 * partical_x[index] - partical_x[selectedindex] >= 1 && 2 * partical_x[index] - partical_x[selectedindex] <= n - 1 && 2 * partical_y[index] - partical_y[selectedindex] >= 1 && 2 * partical_y[index] - partical_y[selectedindex] <= n - 1 ) {
					choices[choicenumber] = index;
					choicenumber++;
				//}
				
			}
		}
	}
	
	selectedindex = "";
	
	
	if (choices.length > 0) {
	
		var secondselect;
		var ran = true;
		for (i=0;i<choices.length;i++) {
			secondselect = choices[i];
			aimove(firstselect,secondselect);
			var evaluation = evalueatePosition();
			//alert("aibluecreatures: " + aibluecreatures + " " + "airedcreatures: " + airedcreatures);
			//alert(firstselect + " " + secondselect + " " + "evaluation: " + evaluation);
			if (evaluation > maxeval) {
				
				maxeval = evaluation;
				choice = i;
				ran = false;
			}
			aibluecreatures = 0;
			airedcreatures = 0;
			aiblueparts = 0;
			airedparts = 0;
		}
		
		if (ran) {
			choice = Math.floor(Math.random() * choices.length);
			//alert("random");
		}
		selectedindex = choices[choice];
		secondselect = selectedindex;
		
		select(selectedindex);
		
		}
		for (y=0;y<n;y++){
			for (x=0;x<n;x++){
				var index = x + "x" + y;
				partical_selected[index] = "no";
				ipartical_selected[index] = "no";
			}
		}
		
	if (choices.length == 0) {
		
		ai();
	}
	
}

//move the aiparticals.
function aimove(firstselect,secondselect) {
	
	for (y=0;y<n;y++) {
		for (x=0;x<n;x++) {
			var index = x + "x" + y;
			aipartical_team[index] = partical_team[index];
			aipartical_x[index] = partical_x[index];
			aipartical_y[index] = partical_y[index];
			aipartical_horizontal[index] = partical_horizontal[index];
			aipartical_vertical[index] = partical_vertical[index];
			aipartical_selected[index] = "no";
			

			aiipartical_x[index] = ipartical_x[index];
			aiipartical_y[index] = ipartical_y[index];
			aiipartical_horizontal[index] = ipartical_horizontal[index];
			aiipartical_vertical[index] = ipartical_vertical[index];
			aiipartical_selected[index] = "no";
		}
			
	}
	
	//alert(aipartical_selected[firstselect]);
	aiselect(firstselect);
	aiselect(secondselect);
}

//evalueate a position.
function evalueatePosition() {
	aibildcreatures();
	var side = 1;
	if (!turnblue) {
		side = -1;
	}
		
	return  (side * (4*(aibluecreatures - airedcreatures) + (aiblueparts - airedparts)));
}

//builds creatures for the ai.
function aibildcreatures(){
	for (y=0;y<n;y++){
		for (x=0;x<n;x++){
			var index = x + "x" + y;
			aipartical_team[index] = "black";
		}
	}
	
	for (y=0;y<n;y++){
		for (x=0;x<n;x++){
			var index = x + "x" + y;
			var indexb = x + "x" + (y-1);
			var indexc = (x+1) + "x" + (y-1);
			var indexd = (x+1) + "x" + y;
			if (aipartical_horizontal[index] == "right" && aipartical_vertical[index] == "up" && aipartical_horizontal[indexb] == "right" && aipartical_vertical[indexb] == "down" && aipartical_horizontal[indexc] == "left" && aipartical_vertical[indexc] == "down" && aipartical_horizontal[indexd] == "right" && aipartical_vertical[indexd] == "up"){
				aibluecreatures++;
				if(aipartical_team[index] == "red"){
					aipartical_team[index] = "purple";
				}else{
					aipartical_team[index] = "blue";
				}
				aiequlizeteam(x,y,"vertical");
				aiequlizeteam(x,y,"horizontal");
			}
			if (aipartical_horizontal[index] == "left" && aipartical_vertical[index] == "up" && aipartical_horizontal[indexb] == "right" && aipartical_vertical[indexb] == "down" && aipartical_horizontal[indexc] == "left" && aipartical_vertical[indexc] == "down" && aipartical_horizontal[indexd] == "left" && aipartical_vertical[indexd] == "up"){
				aibluecreatures++;
				if(aipartical_team[index] == "red"){
					aipartical_team[index] = "purple";
				}else{
					aipartical_team[index] = "blue";
				}
				aiequlizeteam(x,y,"vertical");
				aiequlizeteam(x,y,"horizontal");
			}
			if (aipartical_horizontal[index] == "right" && aipartical_vertical[index] == "up" && aipartical_horizontal[indexb] == "right" && aipartical_vertical[indexb] == "down" && aipartical_horizontal[indexc] == "right" && aipartical_vertical[indexc] == "down" && aipartical_horizontal[indexd] == "left" && aipartical_vertical[indexd] == "up"){
				airedcreatures++;
				if(aipartical_team[index] == "blue"){
					aipartical_team[index] = "purple";
				}else{
					aipartical_team[index] = "red";
				}
				aiequlizeteam(x,y,"vertical");
				aiequlizeteam(x,y,"horizontal");
			}
			if (aipartical_horizontal[index] == "right" && aipartical_vertical[index] == "up" && aipartical_horizontal[indexb] == "left" && aipartical_vertical[indexb] == "down" && aipartical_horizontal[indexc] == "left" && aipartical_vertical[indexc] == "down" && aipartical_horizontal[indexd] == "left" && aipartical_vertical[indexd] == "up"){
				airedcreatures++;
				if(aipartical_team[index] == "blue"){
					aipartical_team[index] = "purple";
				}else{
					aipartical_team[index] = "red";
				}
				aiequlizeteam(x,y,"vertical");
				aiequlizeteam(x,y,"horizontal");
			}
		}
	}
}

//equlizes the team across the creature for the ai.
function aiequlizeteam(x,y,vh){
	var index = x + "x" + y;
	var indexnext;
	if (vh == "horizontal"){
		if (aipartical_horizontal[index] == "right"){
			x++;
			indexnext = x + "x" + y;
			if (aipartical_horizontal[indexnext] == "left"){
				aipartical_team[indexnext] = aipartical_team[index];
				if (aipartical_team[index] == "blue") {
						aiblueparts++;
				}
				if (aipartical_team[index] == "red") {
						airedparts++;
				}
				aiequlizeteam(x,y,"vertical");
			}
		}else{
			x--;
			indexnext = x + "x" + y;
			if (aipartical_horizontal[indexnext] == "right"){
				aipartical_team[indexnext] = aipartical_team[index];
				if (aipartical_team[index] == "blue") {
						aiblueparts++;
				}
				if (aipartical_team[index] == "red") {
						airedparts++;
				}
				aiequlizeteam(x,y,"vertical");
			}
		}
	}
	else{
		if (aipartical_vertical[index] == "down"){
			y++;
			indexnext = x + "x" + y;
			if (aipartical_vertical[indexnext] == "up"){
				aipartical_team[indexnext] = aipartical_team[index];
				if (aipartical_team[index] == "blue") {
						aiblueparts++;
				}
				if (aipartical_team[index] == "red") {
						airedparts++;
				}
				aiequlizeteam(x,y,"horizontal");
			}
		}else{
			y--;
			indexnext = x + "x" + y;
			if (aipartical_vertical[indexnext] == "down"){
				aipartical_team[indexnext] = aipartical_team[index];
				if (aipartical_team[index] == "blue") {
						aiblueparts++;
				}
				if (aipartical_team[index] == "red") {
						airedparts++;
				}
				aiequlizeteam(x,y,"horizontal");
			}
		}
	}
}

//sets selected of aiparticals from the current ai creature to "child".
function aicreature(x,y,vh){
	var index = x + "x" + y;
	var indexnext;
	if (vh == "horizontal"){
		if (aipartical_horizontal[index] == "right"){
			x++;
			indexnext = x + "x" + y;
			if (aipartical_horizontal[indexnext] == "left"){
				aipartical_selected[indexnext] = "child";
				aicreature(x,y,"vertical");
			}
		}else{
			x--;
			indexnext = x + "x" + y;
			if (aipartical_horizontal[indexnext] == "right"){
				aipartical_selected[indexnext] = "child";
				aicreature(x,y,"vertical");
			}
		}
	}
	else{
		if (aipartical_vertical[index] == "down"){
			y++;
			indexnext = x + "x" + y;
			if (aipartical_vertical[indexnext] == "up"){
				aipartical_selected[indexnext] = "child";
				aicreature(x,y,"horizontal");
			}
		}else{
			y--;
			indexnext = x + "x" + y;
			if (aipartical_vertical[indexnext] == "down"){
				aipartical_selected[indexnext] = "child";
				aicreature(x,y,"horizontal");
			}
		}
	}
}

//selects an aipartical.
function aiselect(index){
	
	var x = aipartical_x[index];
	var y = aipartical_y[index];
	if (aipartical_selected[index] == "yes") {
		
		for (y=0;y<n;y++){
			for (x=0;x<n;x++){
			var index = x + "x" + y;
			aipartical_selected[index] = "no";
			}
		}
	}else{
		if (aipartical_selected[index] == "child"){
		
		for (y=0;y<n;y++){
			for (x=0;x<n;x++){
			var indexselected = x + "x" + y;
			if (aipartical_selected[indexselected] == "yes"){
				var dx = aipartical_x[index] - aipartical_x[indexselected];
				var dy = aipartical_y[index] - aipartical_y[indexselected];
				
				for (y=0;y<n;y++){
					for (x=0;x<n;x++){
					var indexchild = x + "x" + y;
						if (aipartical_selected[indexchild] == "child" || aipartical_selected[indexchild] == "yes"){
							var copyx = aipartical_x[indexchild] + dx;
							var copyy = aipartical_y[indexchild] + dy;
							var indexcopy = copyx + "x" + copyy;
							aiipartical_horizontal[indexcopy] = aipartical_horizontal[indexchild];
							aiipartical_vertical[indexcopy] = aipartical_vertical[indexchild];
							aiipartical_selected[indexcopy] = "child";
						}
					}
				}
				
				for (b=0;b<n;b++){
					for (a=0;a<n;a++){
					var index = a + "x" + b;
						if (aiipartical_selected[index] == "child"){
							aipartical_horizontal[index] = aiipartical_horizontal[index];
							aipartical_vertical[index] = aiipartical_vertical[index];
						}
					}
				}
			}
			
			}
		}
		
		}else{
			aipartical_selected[index] = "yes";
		}
	}
	
	for (b=0;b<n;b++){
		for (a=0;a<n;a++){
			var index = a + "x" + b;
			aiipartical_selected[index] = "no";
		}
	}
	
	aicreature(x,y,"vertical");
	aicreature(x,y,"horizontal");
}