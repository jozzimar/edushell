//Class Gwt::Image
function Image ()
{
	Frame.call (this);
	this.html = document.createElement("img");
	this.html.className = "gwt_image";
	this.html.src = host+"images/default_image.svg";
}

Image.prototype = Object.create (Frame.prototype);

Image.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Image.prototype.set_image = function (image)
{
	this.html.src = host+"images/"+image;
}
//Ends Gwt::Image
//##################################################################################################

