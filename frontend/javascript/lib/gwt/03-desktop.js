//##################################################################################################
//Class Gwt::Desktop
function Desktop ()
{
	Frame.call(this);
	this.html = document.body;
	this.html.className = "gwt_desktop";
	this.adjustment_size ();
}

Desktop.prototype = Object.create (Frame.prototype);

Desktop.prototype.finalize = function ()
{

Frame.prototype.finalize.call (this);
}

Desktop.prototype.adjustment_size = function ()
{
this.set_size (Gwt.SCREEN_DEVICE.width, Gwt.SCREEN_DEVICE.height);
}
//Ends Gwt::Desktop
//##################################################################################################

