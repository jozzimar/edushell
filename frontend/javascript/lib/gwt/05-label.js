//Class Gwt::Label
function Label ()
{
	Frame.call (this);
	this.html = document.createElement("p");
	this.html.className = "gwt_label";
	this.text = "Default text";
	this.html.textContent = this.text;
}

Label.prototype = Object.create (Frame.prototype);

Label.prototype.finalize = function ()
{
	Frame.finalize.call (this);
	this.text = null;
}

Label.prototype.set_text = function (text)
{
	this.text = text;
	this.html.textContent = this.text;
}

Label.prototype.set_size = function (size)
{
	this.html.style.fontSize = size;
}
//Ends Gwt::Static_text
//##################################################################################################

