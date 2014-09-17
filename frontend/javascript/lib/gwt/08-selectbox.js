//Class Gwt::Selectbox
function Selectbox ()
{
	Frame.call (this);
	this.html = document.createElement("ol");
	this.html.className = "gwt_selectbox";
	this.options = [];
	this.init ();
}

Selectbox.prototype = Object.create (Frame.prototype);

Selectbox.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Selectbox.prototype.init = function ()
{
	this.options[this.options.length] = document.createElement("li");
	this.options[this.options.length-1].value = undefined;
	this.options[this.options.length-1].text = "Seleccione una opción";
	this.html.appendChild(this.options[this.options.length-1]);
}

Selectbox.prototype.push = function (value, text)
{
	this.options[this.options.length] = document.createElement("option");
	this.options[this.options.length-1].value = value;
	this.options[this.options.length-1].text = text;
	this.html.appendChild(this.options[this.options.length-1]);
}
//Ends Gwt::Selectbox
//##################################################################################################

