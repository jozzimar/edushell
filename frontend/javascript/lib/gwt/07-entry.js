//Class Gwt::Entry
function Entry ()
{
	Frame.call (this);
	this.html = document.createElement("input");
	this.html.className = "gwt_entry";
}

Entry.prototype = Object.create (Frame.prototype);

Entry.prototype.finalize = function ()
{
	Frame.prototype.finalize.call (this);
}

Entry.prototype.set_placeholder = function (text)
{
	this.html.placeholder = text;
}
//Ends Gwt::Entry
//##################################################################################################

