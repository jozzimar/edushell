//Class Gwt::Window
function Window ()
{
	Frame.call(this);
	this.html.className = "gwt_window";
	this.init_ui ();
}

Window.prototype = Object.create (Frame.prototype);

Window.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Window.prototype.init_ui = function ()
{
	this.set_border_width (10);
	this.set_size (Gwt.SCREEN_DEVICE.width * 0.95, Gwt.SCREEN_DEVICE.height * 0.95);
	this.set_position (Gwt.WIN_POS_CENTER);
}

Window.prototype.set_border_width = function (border)
{
	this.border = border;
	this.set_size (this.width - (this.border*2), this.height - (this.border*2));
	this.html.style.padding = border;
}
//Ends Gwt::Window
//##################################################################################################

