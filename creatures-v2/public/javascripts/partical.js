//particals constructor function.
function partical (x ,y ,horizontal ,vertical ,height ,xpos ,ypos ,selected) {
	this.x = x;
	this.y = y;
	this.horizontal = horizontal;
	this.vertical = vertical;
	this.height = height;
	this.xpos = xpos;
	this.ypos = ypos;
	this.team = "black";
	
	if(selected) {
		this.selected = selected;
	}else{
		this.selected = "no";
	}
	this.picture = document.createElement("IMG");
	this.draw = draw;
	this.adjust = adjust;
}

function draw () {
	document.getElementById("board").appendChild(this.picture);
}

function adjust () {
	this.picture.style.position = "absolute";
	this.picture.style.left = this.xpos + "px";
	this.picture.style.top = this.ypos + "px";
	
	switch (this.selected) {
		case "yes":
			this.picture.src = "../images/skins/" + skin + "/green/" + this.vertical + this.horizontal + ".bmp";
		break;
		
		case "child":
			this.picture.src = "../images/skins/" + skin + "/yellow/" + this.vertical + this.horizontal + ".bmp";
		break;
		
		default:
			this.picture.src = "../images/skins/" + skin + "/" + this.team + "/" + this.vertical + this.horizontal + ".bmp";
	}
	
	this.picture.style.height = this.height + "px"
	this.picture.id = this.x + "x" + this.y;
}
