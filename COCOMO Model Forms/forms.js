function ButtonSelector() {
	var radioValue = document.querySelector('input[name="buttonGroup"]:checked').value;
	return radioValue;
}

//Stores all the values from pages
//***Need Database for this, functions only run if pages are loaded sequencially***
var inputs = new Array(2);

//Add value to Database
function projectTypeSelector() {
	//alert(ButtonSelector());
	inputs.push(ButtonSelector());
	//alert(inputs[0]);
}

function LOCSelector() {
	var sliderValue = document.getElementById("estimLOC").value;
	return sliderValue;
}

//Add value to Database
function submitLOC() {
	//alert(LOCSelector());
	inputs.push(LOCSelector());
	//alert(inputs[0]);
}


//Need Database for this
function locEq() {
	//For Testing Purposes:
	inputs[0] = 0;
	inputs[1] = 10;

	var matrix = new Array(3);
	matrix[0] = new Array(4); //Organic
	matrix[1] = new Array(4); //Semi-Detached
	matrix[2] = new Array(4); //Embedded
	
	matrix[0][0] = 2.4;
	matrix[0][1] = 1.05;
	matrix[0][2] = 2.5;
	matrix[0][3] = 0.38;
	
	matrix[1][0] = 3.0;
	matrix[1][1] = 1.12;
	matrix[1][2] = 2.5;
	matrix[1][3] = 0.35;
	
	matrix[2][0] = 3.6;
	matrix[2][1] = 1.2;
	matrix[2][2] = 2.5;
	matrix[2][3] = 0.32;

	var valsEquation = new Array(2);
	
	if (inputs[0] == 0) {
		var calcEffortTimeO = matrix[0][0]*Math.pow(inputs[1],matrix[0][1]).toFixed(2);
		valsEquation.push(calcEffortTimeO);
		var calcDevTimeO = matrix[0][2]*Math.pow(calcEffortTimeO,matrix[0][3]).toFixed(2);
		valsEquation.push(calcDevTimeO);

		var effort = document.getElementById("effort").innerHTML = calcEffortTimeO;
		var devTime = document.getElementById("devTime").innerHTML = calcDevTimeO;
	}

	if (inputs[0] == 1) {
		var calcEffortTimeS = matrix[1][0]*Math.pow(inputs[1],matrix[1][1]).toFixed(2);
		valsEquation.push(calcEffortTimeS);
		var calcDevTimeS = matrix[1][2]*Math.pow(calcEffortTimeS,matrix[1][3]).toFixed(2);
		valsEquation.push(calcDevTimeS);

		var effort = document.getElementById("effort").innerHTML = calcEffortTimeS;
		var devTime = document.getElementById("devTime").innerHTML = calcDevTimeS;
	}

	if (inputs[0] == 2) {
	var calcEffortTimeS = matrix[2][0]*Math.pow(inputs[1],matrix[2][1]).toFixed(2);
	valsEquation.push(calcEffortTimeE);
	var calcDevTimeS = matrix[2][2]*Math.pow(calcEffortTimeE,matrix[2][3].toFixed(2));
	valsEquation.push(calcEffortTimeE);

	var effort = document.getElementById("effort").innerHTML = calcEffortTimeE;
	var devTime = document.getElementById("devTime").innerHTML = calcDevTimeE;
	}
	//alert(calcEffortTimeO);
	//alert(calcDevTimeO);
	
	return valsEquation;
}

//Need Database for this
function LOCOESubmit() {
	//alert(LOCSelector());
	inputs.push(valsEquation[0],valsEquation[1]);
	//alert(valsEquation);
}