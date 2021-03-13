function ButtonSelector() {
	var radioValue = document.querySelector('input[name="buttonGroup"]:checked').value;
	return radioValue;
}

function send() {
	alert(ButtonSelector());
}